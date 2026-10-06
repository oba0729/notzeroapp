const defaultConversations = [
    {
        id: 1,
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/100?img=47",
        online: true,
        isGroup: false,
        unread: 2,
        about: "Product Designer at Notzero Tech Academy.",
        messages: [
            {
                sender: "Sarah",
                text: "Hey John! How's the project coming along?",
                time: "10:21 AM"
            },
            {
                sender: "John",
                text: "Hi Sarah! It's going well. Just finishing up the chat UI.",
                time: "10:22 AM"
            },
            {
                sender: "Sarah",
                text: "That's awesome! Can't wait to see it. Let me know if you need any help.",
                time: "10:23 AM"
            },
            {
                sender: "John",
                text: "Will do! Thanks so much 😊",
                time: "10:23 AM"
            },
            {
                sender: "Sarah",
                text: "Okay, see you then!",
                time: "10:24 AM"
            }
        ]
    },

    {
        id: 2,
        name: "Dev Team",
        avatar: null,
        online: true,
        isGroup: true,
        unread: 5,
        about: "Notzero development team",
        messages: [
            {
                sender: "James",
                text: "Can you review the new dashboard?",
                time: "9:42 AM"
            },
            {
                sender: "John",
                text: "Sure. I'll check it this afternoon.",
                time: "9:44 AM"
            }
        ]
    },

    {
        id: 3,
        name: "Michael Chen",
        avatar: "https://i.pravatar.cc/100?img=12",
        online: false,
        isGroup: false,
        unread: 0,
        about: "Frontend Developer",
        messages: [
            {
                sender: "Michael",
                text: "Let me know when you're available.",
                time: "Yesterday"
            }
        ]
    },

    {
        id: 4,
        name: "Design Squad",
        avatar: null,
        online: true,
        isGroup: true,
        unread: 0,
        about: "Notzero design team",
        messages: [
            {
                sender: "Anna",
                text: "That looks great.",
                time: "Yesterday"
            }
        ]
    },

    {
        id: 5,
        name: "Emma Williams",
        avatar: "https://i.pravatar.cc/100?img=32",
        online: false,
        isGroup: false,
        unread: 0,
        about: "UX Researcher",
        messages: [
            {
                sender: "Emma",
                text: "Thanks for your help!",
                time: "Mon"
            }
        ]
    },

    {
        id: 6,
        name: "Project Alpha",
        avatar: null,
        online: true,
        isGroup: true,
        unread: 0,
        about: "Project Alpha team",
        messages: [
            {
                sender: "John",
                text: "Uploaded a file",
                time: "Mon"
            }
        ]
    },

    {
        id: 7,
        name: "Daniel Brown",
        avatar: "https://i.pravatar.cc/100?img=11",
        online: false,
        isGroup: false,
        unread: 0,
        about: "Backend Developer",
        messages: [
            {
                sender: "Daniel",
                text: "Sounds good 👍",
                time: "Sun"
            }
        ]
    }
];

let chats = JSON.parse(localStorage.getItem("chats")) || defaultConversations;

function storeChats() {
    localStorage.setItem("chats", JSON.stringify(chats));
}

let searchInputs = document.getElementById("searchInputs");
let editBtn = document.getElementById("editBtn");
let allBtn = document.getElementById("all");
let unreadBtn = document.getElementById("unread");
let groups = document.getElementById("groups");
let conversationsElement = document.getElementById("conversations");
let chatHeader = document.getElementById("chatHeader");
let chatMessages = document.getElementById("chatMessages");
let messageInput = document.getElementById("messageInput");
let sendBtn = document.getElementById("sendBtn");

let currentUser = 1;
let activeFilter = "all";

function getCurrentConversation() {
    let activeUser = chats.find(
        chat => chat.id === currentUser
    );

    return activeUser;
}

function showConversationList() {
    conversationsElement.innerHTML = "";

    let userInput = searchInputs.value.toLowerCase().trim();

    chats.forEach((item) => {
        if (activeFilter === "unread" && item.unread === 0) return;
        if (activeFilter === "groups" && !item.isGroup) return;

        if (!item.name.toLowerCase().includes(userInput)) {
            return;
        }

        let avatarHTML;

        if (item.isGroup) {
            avatarHTML = `
                <div class="group">
                    <span>👥</span>
                </div>
            `;
        } else {
            avatarHTML = `
                <span>
                    <img
                        class="avatar"
                        src="${item.avatar}"
                        alt="user"
                    />
                </span>
            `;
        }

        let lastMessage =
            item.messages[item.messages.length - 1] || {
                text: "Start a conversation",
                time: ""
            };

        let containerElement =
            document.createElement("div");

        containerElement.classList.add(
            "container-element"
        );

        if (item.id === currentUser) {
            containerElement.classList.add("active");
        }

        containerElement.innerHTML = `
            <div class="each-user">

                ${avatarHTML}

                <div class="conversation-user">

                    <div class="first-box">

                        <p class="username">
                            ${item.name}
                        </p>

                        <p class="lastmessage">
                            ${lastMessage.text}
                        </p>

                    </div>

                    <div class="first-box">

                        <p class="time">
                            ${lastMessage.time}
                        </p>

                        <p>
                            ${
                                item.unread > 0
                                    ? `<span class="unread">
                                        ${item.unread}
                                      </span>`
                                    : ""
                            }
                        </p>

                    </div>

                </div>

            </div>
        `;

        containerElement.addEventListener(
            "click",
            () => {
                openConversation(item.id);
            }
        );

        conversationsElement.append(
            containerElement
        );
    });

    storeChats();
}

function openConversation(id) {
    currentUser = id;

    let activeUser = chats.find(
        chat => chat.id === currentUser
    );

    activeUser.unread = 0;

    storeChats();

    showConversationList();

    renderChatHead();

    renderMessages();

    renderProfile();
}

function renderChatHead() {
    let conversation =
        getCurrentConversation();

    chatHeader.innerHTML = "";

    let avatarHTML;

    if (conversation.isGroup) {
        avatarHTML = `
            <div class="group">
                <span>👥</span>
            </div>
        `;
    } else {
        avatarHTML = `
            <span>
                <img
                    class="avatar"
                    src="${conversation.avatar}"
                    alt="user"
                />
            </span>
        `;
    }

    const chatHead =
        document.createElement("div");

    chatHead.classList.add("chat-head");

    chatHead.innerHTML = `
        <div class="chat-head-user">

            ${avatarHTML}

            <div>

                <p>
                    ${conversation.name}
                </p>

                <div class="online-container">

                    <div
                        class="${
                            conversation.online
                                ? "green-dot"
                                : "grey-dot"
                        }"
                    ></div>

                    <div
                        style="
                            color: grey;
                            font-size: 13px;
                        "
                    >
                        ${
                            conversation.online
                                ? "Online"
                                : "Offline"
                        }
                    </div>

                </div>

            </div>

        </div>

        <div class="icon-container">

            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
            </svg>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
            </svg>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
            </svg>

            <button
                id="profileToggleBtn"
                class="profile-toggle"
                type="button"
                aria-label="Toggle profile details"
                title="Profile details"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                </svg>
            </button>

        </div>
    `;

    chatHeader.append(chatHead);
    renderProfile();

    chatHead
        .querySelector("#profileToggleBtn")
        .addEventListener("click", () => {
            const profileColumn = document.querySelector(".column-3");
            profileColumn.classList.toggle("profile-hidden");

            if (!profileColumn.classList.contains("profile-hidden")) {
                renderProfile();
            }
        });
}

function renderMessages() {
    let conversation =
        getCurrentConversation();

    chatMessages.innerHTML = "";

    conversation.messages.forEach((message) => {

        let messageElement =
            document.createElement("div");

        messageElement.classList.add("message");

        if (message.sender === "John") {
            messageElement.classList.add("sent");
        } else {
            messageElement.classList.add("received");
        }

        messageElement.innerHTML = `
            <div class="message-content">

                <p>
                    ${message.text}
                </p>

                <span>
                    ${message.time}
                </span>

            </div>
        `;

        chatMessages.append(
            messageElement
        );
    });

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}

searchInputs.addEventListener(
    "input",
    () => {
        showConversationList();
    }
);

function setActiveFilter(filter, tab) {
    activeFilter = filter;

    document.querySelectorAll(".tab-container .tabs").forEach((item) => {
        item.classList.toggle("active", item === tab);
    });

    showConversationList();
}

allBtn.addEventListener(
    "click",
    () => setActiveFilter("all", allBtn)
);

unreadBtn.addEventListener(
    "click",
    () => setActiveFilter("unread", unreadBtn)
);

groups.addEventListener(
    "click",
    () => setActiveFilter("groups", groups)
);

editBtn.addEventListener("click", () => {
    const name = window.prompt("Start a chat with:");

    if (!name || !name.trim()) return;

    const normalized = name.trim();
    let conversation = chats.find(
        (chat) => chat.name.toLowerCase() === normalized.toLowerCase()
    );

    if (!conversation) {
        conversation = {
            id: Date.now(),
            name: normalized,
            avatar: `https://i.pravatar.cc/100?u=${encodeURIComponent(normalized)}`,
            online: false,
            isGroup: false,
            unread: 0,
            about: "New conversation",
            messages: []
        };

        chats.unshift(conversation);
    }

    activeFilter = "all";
    setActiveFilter("all", allBtn);
    openConversation(conversation.id);
    messageInput.focus();
});

function renderProfile() {
    const panel = document.getElementById("profile-container");
    const conversation = getCurrentConversation();

    if (!panel || !conversation) return;

    const avatar = conversation.isGroup
        ? `
            <div class="profile-group">
                👥
            </div>
        `
        : `
            <img
                class="profile-avatar"
                src="${conversation.avatar}"
                alt="${conversation.name}"
            >
        `;

    panel.innerHTML = `
        <div class="profile-top">
            <button class="profile-close" type="button">×</button>
        </div>

        <div class="profile-summary">
            ${avatar}
            <h2>${conversation.name}</h2>
            <p class="profile-status">
                <span
                    class="${conversation.online ? "green-dot" : "grey-dot"}"
                ></span>
                ${conversation.online ? "Online" : "Offline"}
            </p>
        </div>

        <div class="profile-actions">
            <button type="button" data-action="profile">Profile</button>
            <button type="button" data-action="call">Call</button>
            <button type="button" data-action="video">Video</button>
            <button type="button" data-action="more">More</button>
        </div>

        <section class="profile-section">
            <h3>About</h3>
            <p>${conversation.about || "No description available."}</p>
        </section>

        <section class="profile-section">
            <h3>Media, links and docs</h3>
            <div class="media-placeholder">No media shared yet</div>
        </section>

        <section class="profile-options">
            <button type="button" id="muteConversation">
                ♧ &nbsp; Mute notifications <span>○</span>
            </button>
            <button type="button" id="starConversation">
                ☆ &nbsp; Star conversation
            </button>
            <button type="button" id="blockConversation" class="danger">
                ⊘ &nbsp; Block user
            </button>
        </section>
    `;

    panel.querySelector(".profile-close")
        ?.addEventListener("click", () => {
            document
                .querySelector(".column-3")
                .classList.toggle("profile-hidden");
        });

    panel.querySelector("#starConversation")
        ?.addEventListener("click", (event) => {
            const button = event.currentTarget;
            button.classList.toggle("selected");

            button.innerHTML = button.classList.contains("selected")
                ? "★ &nbsp; Starred conversation"
                : "☆ &nbsp; Star conversation";
        });
}

sendBtn.addEventListener(
    "click",
    sendMessage
);

function sendMessage() {
    let text =
        messageInput.value.trim();

    if (text === "") {
        return;
    }

    let conversation =
        getCurrentConversation();

    let newMessage = {
        sender: "John",
        text: text,
        time: new Date().toLocaleTimeString(
            [],
            {
                hour: "numeric",
                minute: "2-digit"
            }
        )
    };

    conversation.messages.push(
        newMessage
    );

    storeChats();

    messageInput.value = "";

    renderMessages();

    showConversationList();

    replyMessage(conversation);
}

messageInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {
            sendMessage();
        }

    }
);

function replyMessage(conversation) {
    const replies = [
        "Hi! Thanks for your message.",
        "That sounds good!",
        "I’ll get back to you soon.",
        "Thanks for letting me know."
    ];
    
     const replyText = replies[Math.floor(Math.random() * replies.length)];

    // Keep the conversation reference so a quick chat switch won't misplace the reply.
    window.setTimeout(() => {
        const reply = {
            sender: conversation.name,
            text: replyText,
            time: new Date().toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit"
            })
        };

        conversation.messages.push(reply);

        if (getCurrentConversation()?.id !== conversation.id) {
            conversation.unread = (conversation.unread || 0) + 1;
        }

        storeChats();

        if (getCurrentConversation()?.id === conversation.id) {
            renderMessages();
        }
        showConversationList();
    }, 800);
}
  

showConversationList();

renderChatHead();

renderMessages();
renderProfile();
