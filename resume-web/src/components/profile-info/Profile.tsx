import { Contacts } from './Contacts';
import pic from '/profile.png';
export const Profile = () => {
  return (
    <div className='border m-2 rounded-md grid grid-cols-3 items-center justify-between gap-2 p-2'>
      <div className='col-span-1 object-fit rounded-md border'>
        <img className='rounded-md' src={pic} alt="joby-profile"/>  
      </div>
      <div className='col-span-2 text-center grid grid-cols-1 self-end'>
        <div>
          <h1 className='text-[1.6rem] font-bold text-orange-700'>Jonathan Golimlim </h1>
          <i className='text-md text-gray-400'>Software Developer</i>
        </div>
        <Contacts></Contacts>
      </div>
      <div>

      </div>
    </div>
  )
}