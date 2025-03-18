import Header from "./components/Header.jsx"
import Entry from  "./components/Entry.jsx"
import data from "./data.js"

export default function App() {

    const entryElems = data.map((d) => {
        return <Entry id={d.id} {...d} />
    })

    return (
        <>
            <Header />
            {entryElems} 
        </>
    )
}