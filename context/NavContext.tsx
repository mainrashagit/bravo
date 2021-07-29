import { createContext, Dispatch, SetStateAction, useState } from "react"

interface INavContext {
  scrollDown: boolean
  setScrollDown: Dispatch<SetStateAction<boolean>>
}

export const NavContext = createContext<INavContext | undefined>(undefined)

interface NavContextProviderProps { }

const NavContextProvider: React.FC<NavContextProviderProps> = ({
  children,
}) => {
  const [scrollDown, setScrollDown] = useState(false)
  return <NavContext.Provider value={{ scrollDown, setScrollDown }}>{children}</NavContext.Provider>
}

export default NavContextProvider
