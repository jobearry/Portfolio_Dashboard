import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Contacts } from './Contacts';
import pic from '/profile_dark.png';
export const Profile = () => {
  return (
    <Card className='bg-transparent my-2 text-gray-400 border m-2'>
      <CardHeader className=''>
      </CardHeader>
      <CardContent className='
        sm:flex sm:justify-center sm:items-center'>
        <img className='rounded-md m-auto sm:m-0 sm:h-45' src={pic} alt="joby-profile"/>  
        <div>
          <h1 className='text-[2rem] sm:text-[2.5rem] md:text-[3.5] font-bold text-orange-700'>Jonathan Golimlim </h1>
          <i className='text-xl sm:text-[2rem] text-gray-400'>Software Developer</i>
        </div>
      </CardContent>
      <CardFooter>
        <Contacts></Contacts>
      </CardFooter>
    </Card>
  )
}