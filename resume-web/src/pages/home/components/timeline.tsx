interface TimelineProps {
  events: TimelineEvent[]
}

export interface TimelineEvent{
  title: string,
  date: string,
  description: string
}

export const Timeline: React.FC<TimelineProps> = ({events}) => {
  return (              
    <div className="relative border-l-2 border-orange-700 ml-5">
      {events.map((event, index) => (
        <div key={index} className="mb-8 ml-[1.93rem] relative group">
          {/* Dot */}
          <span className="absolute -left-10 w-4 h-4 rounded-full border-2 
            transition-all duration-300 border-orange-700 bg-[#141414] group-hover:bg-orange-700"></span>
          
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