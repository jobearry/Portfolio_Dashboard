export const Footer = () => {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <footer className="border-t-gray-500 border-t h-16 grid place-items-center text-sm">Jonathan Golimlim | © {year}</footer>
  )
}