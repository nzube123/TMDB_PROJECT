export function Header() {
    return (
        <header className='header_cont'>
            <center>
                <div className='header_item'>
                    <h1 className='header1'>Discover popular and intresting movies</h1>
                    <p className='header_add'>Explore our database now to find millions of interesting movies</p>

                    <div className='input_cont'>
                        <input name='search' type='search' placeholder='Search and Discover your movies' />
                        <button className='search_button'>Search</button>
                    </div>
                </div>
            </center>
        </header>
    )
}