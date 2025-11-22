import { IconRegistry } from "@/components/ui/icon/icon.registry"

export interface BlockProps {
  id: number
  title: string
  icon?: keyof typeof IconRegistry
  description: string
  children: React.ReactNode
}

export const Block: React.FC<BlockProps> = ({title, icon, description, children}) => {
  const Icon = icon ? IconRegistry[icon] : undefined
  return (
    <div className="border border-gray-500 rounded-sm bg-[#141414] m-2" id="education">
      <div className="m-4 flex items-center gap-3">
        <span className="font-bold text-lg text-start flex items-center gap-2">
          {Icon ? <Icon /> : null}
          {title}
        </span>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>
      <p className="text-start mx-5 my-4">
        {description}
      </p>

      <div>
        {children}
      </div>
    </div>
  )
}