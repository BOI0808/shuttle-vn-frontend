import { APP_CONFIG, CHAT_CONFIG } from "@/config/app";

interface ChatQuickPromptsProps {
  disabled: boolean;
  onSelect: (prompt: string) => void;
}

const CHIP_CLASS_NAME =
  "rounded-full border border-emerald-500 bg-white px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50";

export function ChatQuickPrompts({ disabled, onSelect }: ChatQuickPromptsProps) {
  return (
    <div className="flex shrink-0 flex-wrap gap-2 border-t border-gray-100 bg-white px-3 py-2">
      {CHAT_CONFIG.quickPrompts.map((item) => (
        <button
          key={item.label}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(item.prompt)}
          className={CHIP_CLASS_NAME}
        >
          {item.label}
        </button>
      ))}
      <a href={`tel:${APP_CONFIG.hotline.tel}`} className={CHIP_CLASS_NAME}>
        Hotline: {APP_CONFIG.hotline.display}
      </a>
    </div>
  );
}

