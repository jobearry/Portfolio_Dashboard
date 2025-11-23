import { Contacts } from './Contacts';
import pic from '/profile_dark.png';
export const Profile = () => {
  return (
    <div className='flex my-6'>
      <div>
        <img className='rounded-full m-auto' src={pic} alt="joby-profile"/>  
      </div>
      <div className='grid'>
        <span className='text-start m-2'>
          <p className='text-[1.35rem] font-bold'>Jonathan Golimlim </p>
          <span className='flex items-center text-sm gap-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            Quezon City, Philippines
          </span>
          <span className='text-xs'>Software Developer</span>
        </span>
        <Contacts></Contacts>
      </div>
    </div>
  )
}