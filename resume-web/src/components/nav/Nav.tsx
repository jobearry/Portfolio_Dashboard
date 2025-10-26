export const Nav = () => {
  return (
    <nav className="m-2">
      <ul className="grid grid-cols-3 place-items-center gap-2">
        <li className="border w-full rounded-md h-8">
          <a href="#" className="w-full h-full grid place-items-center">Home</a>
        </li>
        <li className="border w-full rounded-md h-8">
          <a href="#experience" className="w-full h-full grid place-items-center">Experience</a>
        </li>
        <li className="border w-full rounded-md h-8">
          <a href="#education" className="w-full h-full grid place-items-center">Education</a>
        </li>
      </ul>
    </nav>
  )
}