import { createContext, Dispatch, SetStateAction, useState } from "react"

interface INavItem {
  item: string
  subItems: string[]
}

interface INavContext {
  scrollDown: boolean
  setScrollDown: Dispatch<SetStateAction<boolean>>
}

export const NavContext = createContext<INavContext | undefined>(undefined)

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
  const [scrollDown, setScrollDown] = useState(false)
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
  return <NavContext.Provider value={{scrollDown, setScrollDown}}>{children}</NavContext.Provider>
}

export default NavContextProvider
