import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Contacts } from './Contacts';
import pic from '/profile_dark.png';
export const Profile = () => {
  return (
    <Card className='bg-transparent my-2 text-gray-400 border m-2'>
      <CardHeader className=''>
        <img className='rounded-md m-auto' src={pic} alt="joby-profile"/>  
        <CardTitle className='object-fit rounded-md'>
        </CardTitle>
        <CardDescription>
          <h1 className='text-[2rem] font-bold text-orange-700'>Jonathan Golimlim </h1>
          <i className='text-xl text-gray-400'>Software Developer</i>
        </CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter>
        <Contacts></Contacts>
      </CardFooter>
    </Card>
  )
}