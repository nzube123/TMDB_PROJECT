import { Header } from "./header";

export default function Page({ children }) {
    return <div>
        <Header />
        {children}
    </div>
}