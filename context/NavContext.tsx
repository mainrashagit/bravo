import { createContext } from "react"

interface INavItem {
  item: string
  subItems: string[]
}

export const NavContext = createContext<INavItem[] | undefined>(undefined)

interface NavContextProviderProps {}

export const navItems: INavItem[] = [
  {
    item: "consulting",
    subItems: ["item1", "item2", "item3"],
  },
  { item: "funding", subItems: ["item4", "item5"] },
  { item: "company service", subItems: ["item6", "item7", "item8"] },
  { item: "tax advice", subItems: ["item9", "item10"] },
  { item: "eu migration program", subItems: ["item4", "item5", "item5", "item5", "item5", "item5", "item5", "item5", "item5", "item5", "item5", "item5", "item5"] },
]

const NavContextProvider: React.FC<NavContextProviderProps> = ({
  children,
}) => {
  const navItems: INavItem[] = [
    {
      item: "consulting",
      subItems: ["item1", "item2", "item3"],
    },
    { item: "funding", subItems: ["item4", "item5"] },
    { item: "company service", subItems: ["item6", "item7", "item8"] },
    { item: "tax advice", subItems: ["item9", "item10"] },
    { item: "eu migration program", subItems: ["item4", "item5", "item5", "item5", "item5", "item5", "item5", "item5", "item5", "item5", "item5", "item5", "item5"] },
  ]
  return <NavContext.Provider value={navItems}>{children}</NavContext.Provider>
}

export default NavContextProvider
