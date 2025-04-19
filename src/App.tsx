import './App.css'

function App() {


  return (
    // <header className="bg-black border-black dark:bg-gray-900 sticky top-0 z-50">

    //   <div className="  max-w-screen-xl flex flex-column items-center justify-between mx-auto p-4 sticky top-0 z-50"></div>
    //   <nav>

    //   </nav>
    //   <p className="text-amber-50"></p>
    // </header>
    <div className="flex ">
      <aside className="h-screen sticky top-0 bg-black flex flex-col items-center space-y-2">
        <p className="text-white">ASTRA Basestation</p>
        <a href="../pages/Arm.tsx">
          <button className='text-white bg-overlay2 rounded-md'>Arm Control</button>
          {/* <svg className="fill-current w-4 h-4 mr-2" xmlns="../assets/banner_icons/arm.webp" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg> */}
        </a>
        <a href="../pages/Bio.tsx">
          <button className='text-white bg-overlay2 rounded-md'>Biosensor Control</button>
        </a>
        <a href="../pages/Doom.tsx">
          <button className='text-white bg-overlay2 rounded-md'>Doom</button>
        </a>
        <a href="App.tsx">
          <button className='text-white bg-overlay2 rounded-md'>Home</button>
        </a>

      </aside>

      <main >

      </main>
    </div>







  );

}


export default App
