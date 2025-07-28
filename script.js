
function sendM(){
    textbox = document.getElementById("main-text")
    msg = textbox.value
    console.log(msg)
    showStatus('Thinking...'); // Show status as thinking
    sendMessage(msg)
    insertSidebarTab(msg) // Add this line to insert a tab in the sidebar
    textbox.value = ""

}
//function displayInPannel(){
//    Lpannel = document.insertE
//}
async function sendMessage(text) {
    const url = "https://docker-ai-agent-python.onrender.com/api/chats/";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: text }),
        });

        if (!response.ok) {
            // If not a 2xx response, log the text for debugging
            const errorText = await response.text();
            console.error("Server error:", errorText);
            showStatus('Error: ' + errorText); // Show error status
            return;
        }

        const data = await response.json();
        console.log("Posted Data!");
        //if (typeof insertImageDiv === "function") {
        //    insertImageDiv(data.message, "bot", "Bot", "bot_container", "assets/3917705.png");
        //} else {
        //    console.log("insertImageDiv is not defined. Message:", data.message);
        //}
        console.log(data.message)
        insertSidebarTab(data.message)
        showStatus('Finished'); // Show finished status
    } catch (error) {
        console.error(error);
        showStatus('Error: ' + error.message); // Show error status
    }
}

// Add this function to insert a tab in the sidebar
function insertSidebarTab(text) {
    const sidebar = document.querySelector('.sidebar'); // Get the sidebar element
    const tab = document.createElement('div'); // Create a new div for the tab
    tab.className = 'sidebar-tab'; // Add the tab class for styling
    tab.textContent = text; // Set the tab text
    sidebar.appendChild(tab); // Add the tab to the sidebar
    // Optionally, scroll to the bottom if many tabs
    sidebar.scrollTop = sidebar.scrollHeight;
}

// Auto-resize the textarea as the user types
const mainText = document.getElementById('main-text');
if (mainText) {
    mainText.addEventListener('input', function() {
        this.style.height = 'auto'; // Reset height
        this.style.height = (this.scrollHeight) + 'px'; // Set to scrollHeight
    });
}

// Mobile sidebar toggle and overlay logic
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');

function openSidebar() {
    sidebar.classList.add('sidebar-open');
   sidebarOverlay.classList.add('active');
}
function closeSidebar() {
    sidebar.classList.remove('sidebar-open');
    sidebarOverlay.classList.remove('active');
}
if (sidebarToggle && sidebar && sidebarOverlay) {
    sidebarToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        openSidebar();
    });
    sidebarOverlay.addEventListener('click', function() {
        closeSidebar();
    });
    // Also close sidebar if clicking anywhere outside sidebar when open
    document.addEventListener('click', function(e) {
        if (
            sidebar.classList.contains('sidebar-open') &&
            !sidebar.contains(e.target) &&
            !sidebarToggle.contains(e.target)
        ) {
            closeSidebar();
        }
    });
}

// Status indicator logic
function showStatus(text) {
    const statusDiv = document.getElementById('status-indicator');
    if (!statusDiv) return;
    statusDiv.textContent = text;
    statusDiv.style.display = 'block';
    if (text === 'Finished') {
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 1200); // Hide after 1.2 seconds
    }
    if (text.startsWith('Error')) {
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 2000); // Hide after 2 seconds for errors
    }
}


