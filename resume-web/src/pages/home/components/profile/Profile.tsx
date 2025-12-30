import { Contacts } from './Contacts';
import pic from '/profile_dark.png';

interface ProfileProp {
  className?: string
}
export const Profile = ({className}: ProfileProp) => {
  return (
    <section className={`flex my-6 items-center ${className}`} aria-labelledby='profile-heading'>
      <figure className='m-4'>
        <img className='rounded-full m-auto' src={pic} alt='Jonathan Golimlim profile photo' />
        <figcaption className='sr-only'>Photo of Jonathan Golimlim</figcaption>
      </figure>

      <div className='flex flex-col justify-center'>
        <h2 id='profile-heading' className='text-[1.35rem] font-bold text-center'>Jonathan Golimlim</h2>

        <p className='flex items-center text-sm gap-1 text-center'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-4' aria-hidden='true' focusable='false'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z' />
          </svg>
          <span>Quezon City, Philippines</span>
        </p>

        <p className='text-sm text-center'>Software Developer</p>

        <address className='not-italic'>
          <Contacts className='flex flex-col'/>
        </address>
      </div>
    </section>
  )
}