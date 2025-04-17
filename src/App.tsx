import './App.css'

function App() {


  return (
    // <header className="bg-black border-black dark:bg-gray-900 sticky top-0 z-50">

    //   <div className="  max-w-screen-xl flex flex-column items-center justify-between mx-auto p-4 sticky top-0 z-50"></div>
    //   <nav>

    //   </nav>
    //   <p className="text-amber-50"></p>
    // </header>

    <div className="flex">
      <aside className="h-screen sticky top-0 bg-black">
        <p className="text-white ">ASTRA Basestation</p>
        //TODO: not sure that this forwards to the page
        <a href="../pages/arm.tsx">
          <button className='text-white'>This is a button</button>
        </a>

      </aside>

      <main >

      </main>
    </div>







  );

}


export default App
