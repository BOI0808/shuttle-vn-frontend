import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Bạn là trợ lý AI của ShuttleVN - hệ thống đặt sân cầu lông.
Nhiệm vụ: Hỗ trợ khách hàng đặt sân, tra cứu lịch, hỏi giá, và giải đáp thắc mắc.
Chỉ trả lời về chủ đề sân cầu lông và dịch vụ của ShuttleVN.
Ngôn ngữ: Tiếng Việt, thân thiện và ngắn gọn.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json() as {
      messages: Array<{ role: string; content: string }>;
    };

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY ?? '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json() as {
      content: Array<{ type: string; text: string }>;
    };

    const text = data.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('');

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Không thể kết nối chatbot, vui lòng thử lại.' },
      { status: 500 },
    );
  }
}
