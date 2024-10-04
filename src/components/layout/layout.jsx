function Layout({isEliminated, children}) {
    return(
        <div className={isEliminated ? 'eliminated' : ''}>
            {children}
        </div>
    )
}

export default Layout;
