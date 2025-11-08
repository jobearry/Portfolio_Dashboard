const navLinks = [
  {name: "Home", link: "#"},
  {name: "Experience", link: "#experience"},
  {name: "Education", link: "#education"},
]

export const Nav = () => {
  return (
    <nav className="m-2">
      <ul className="grid grid-cols-3 place-items-center gap-2">
        {navLinks.map((navLink,index) => (
          <li key={index} className="border w-full rounded-md h-10 h-max-12">
            <a href={navLink.link} className="w-full h-full grid place-items-center">{navLink.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}