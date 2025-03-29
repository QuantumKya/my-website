
class Imports extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
    <link rel="icon" href="../images/misc/icon.jpg" type="image/x-icon">
    <link rel="stylesheet" href="../main.css" type="text/css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@100..900&display=swap" rel="stylesheet">

    <script src="https://kit.fontawesome.com/332620eb80.js" crossorigin="anonymous"></script>

    <script src="https://code.jquery.com/jquery-2.1.0.js" defer></script>

    <script src="../sidebar.js"></script>
        `;
    }
}

class Sidebar extends HTMLElement {
    constructor(dirin) {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
<div class="sidebar">
    
    <span id="stack-conduit" onclick="openSidebar()">
        <i class="fa-solid fa-bars"></i>
    </span>

    <div class="menu-items" id="stack-menu">

        <span class="close-button" onclick="closeSidebar()"><i class="fa-solid fa-xmark"></i></span>

        <a href="index.html" class="menu-header">Home</a>

        <a class="menu-header">Projects</a>
        <div class="menu-item">
            <a href="lights_out.html" class="menu-link">Annoying Puzzle</a>
        </div>

        <a class="menu-header">Silly Games</a>
        <div class="menu-item">
            <a href="sandwich/main.html" class="menu-link">Sandwich Clicker</a>
        </div>

        <!-- <a class="menu-header">Other</a>
            <a href="multiplayer/app/index.html" class="menu-link">Rice Nouveau</a>
        <div class="menu-item"> -->
        </div>

    </div>

</div>
        `;
    }
}
class SidebarSub extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
<div class="sidebar">
    
    <span id="stack-conduit" onclick="openSidebar()">
        <i class="fa-solid fa-bars"></i>
    </span>

    <div class="menu-items" id="stack-menu">

        <span class="close-button" onclick="closeSidebar()"><i class="fa-solid fa-xmark"></i></span>

        <a href="../index.html" class="menu-header">Home</a>

        <a class="menu-header">Projects</a>
        <div class="menu-item">
            <a href="../lights_out.html" class="menu-link">Annoying Puzzle</a>
        </div>

        <a class="menu-header">Silly Games</a>
        <div class="menu-item">
            <a href="../sandwich/main.html" class="menu-link">Sandwich Clicker</a>
            <a href="../platformer/index.html" class="menu-link">Platformer</a>
        </div>
        
        <a class="menu-header">Other</a>
            <!-- <a href="../multiplayer/app/index.html" class="menu-link">Rice Nouveau</a> -->
        <div class="menu-item">
        </div>

    </div>

</div>
        `;
    }
}

class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
    <div id="footer">
        <p>© me 2024</p>
    </div>
        `;
    }
}

customElements.define("import-component", Imports);
customElements.define("sidebar-component", Sidebar);
customElements.define("sidebar-sub-component", SidebarSub);
customElements.define("footer-component", Footer);