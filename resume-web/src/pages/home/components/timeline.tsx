import type { TimelineEvent } from "@/lib/constants/content.constants"

interface TimelineProps {
  events: TimelineEvent[]
}

export const Timeline: React.FC<TimelineProps> = ({events}) => {
  return (              
    <div className="relative border-l-2 border-orange-700 ml-4">
      {events.map((event, index) => (
        <div key={index} className="mb-8 ml-8 relative">
          {/* Dot */}
          <span className="absolute -left-10 w-4 h-4 bg-orange-700 rounded-full"></span>
          
          {/* Content */}
          <div className="rounded mr-5 text-start">
            <h3 className="font-bold text-sm">{event.title}</h3>
            <span className="text-xs text-gray-500">{event.date}</span>
            <p className="text-xs text-gray-500">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}