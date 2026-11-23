const projects = 
{
    project1: 
    {
        type: "Flappy bird Clone",
        title: "Flap-Flap (2026)",
        image: "img/flapflapIcon.png",
        description: "Play as Flap Flap, that was send to an mental institution and has to escape to finally be free from this establishment.",
        details:
        [
            {
                heading: "School Assignment:",
                text: "This very game was created at the very first week of the semester and an entry to Unity for most. However, during this very school assignment, I already had experience to fool around with shader use, shops, skins and many other features."
            },
            {
                heading: "Shader Work:",
                text: "I wasn't the best creator of shaders, however it gave me plenty of time to experiment for a week to create a shader to move a wall. The concept was simple, create a non moving character, and make the player believe they are moving, while in engine, you aren't really moving."
            },
            {
                heading: "How did I went to work?:",
                text: ""
            }
        ],
        tags: ["Unity", "C#", "Solo", "HvA", "School Assignment"],
        links: [
            { label: "Play on itch.io", url: "https://warlock-games-studio.itch.io/flap-flap" }
        ]
    },
    project2: 
    {
        type: "1 Level Boss Rusher",
        title: "The Tartarus Loop (2026)",
        image: "img/TTL.png",
        description: "Play as a copy of Theseus. Run around in a maze, having to defeat the very Minotaur in Tartarus after it perished by the hands of the original Theseus. Over and over again. The soul of the Minotaur can't rest. All it can do is chase the player and try to outsmart you.",
        details:
        [
            {
                heading: "State Machine:",
                text: "The main enemy behaviour script stores its states in a dictionary, with an enum pointing to the active state. The dictionary gives a direct lookup from a state identifier to its state instance, so the state machine doesn't depend on a long conditional chain or a manually indexed collection.",
                images: ["img/TheTartarusLoop/dictionary.png"]
            },
            {
                heading: "States:",
                text: "Every state inherits from an abstract base class, EnemyStateBase, with Enter, Update and Exit functions.",
                images: ["img/TheTartarusLoop/Abstractclass.png"]
            },
            {
                heading: "Transitions:",
                text: "With this base, states can communicate with each other. To switch between them, the enemy behaviour script has a TransitionToState function that changes the enemy's behaviour.",
                images: ["img/TheTartarusLoop/Transition.png"]
            },
            {
                heading: "Phases within the first session:",
                text: "With this base, states can communicate with each other. To switch between them, the enemy behaviour script has a TransitionToState function that changes the enemy's behaviour.",
                images: ["img/TheTartarusLoop/1stPlaythrough.png"]
            },
            {
                heading: "Phases after the first session:",
                text: "After the first session, a randomized pool is assigned to the list. Some phases are more likely to be placed at the front.",
                images: ["img/TheTartarusLoop/poolchance.png"]
            },
            {
                heading: "Also what I've worked on",
                items: 
                [
                    "Cutscene feature",
                    "Camera Shake Feature",
                    "Enemy Phases 1-6",
                    "Steam Achievement Integration",
                    "Door Interaction and State Synchronization",
                    "Damage Feedback System",
                    "Shader Work",
                    "Partial Music Creation",
                    "Sound Effect Creation"
                ]
            }
        ],
        tags: ["Unity", "C#", "3 people Team", "School Assignment", "HvA", "Eventual Steam Release"],
        links: [
            { label: "Play on Steam", url: "https://store.steampowered.com/app/4818930/The_Tartarus_Loop/" },
            { label: "Play on Itch", url: "https://warlock-games-studio.itch.io/the-tartarus-loop" }
        ]
    },
    project3:
    {
        type: "Horror Comedy Game",
        title: "Let me In, Human! (2026)",
        image: "img/LMIH.png",
        description: "Play as one of the few humans that has to survive in an Robot Epidemic. You would have to see which person is human or robot. The only method of knowing is to talk with the individual. Good luck",
        details:
        [
            {
                heading: "What I did?",
                items:
                [
                    "All of the programming, except art & sound effects"
                ]
            },
            {
                heading: "What do I mean with all of the programming except art?",
                text: "I worked together with an artist while creating this game, while I did all of the programming, he did all of the art for the environment, characters or props."
            }
        ],
        tags: ["Unity", "C#", "2 people Team", "Brackeys GameJam"],
        links: [ { label: "Play on Itch", url: "https://warlock-games-studio.itch.io/let-me-in-human"} ]
    },
    project4:
    {
        type: "2D Retro Endless Survival Game",
        title: "Untitled Vampire Game (2026)",
        image: "img/uvg.png",
        description: "You are a vampire lurking in the shadows of a dangerous village. To survive, you must hunt the villagers and drink their blood, but be careful. The guards are always watching.",
        details:
        [
            {
                heading: "School GameJam",
                text: "The very theme we had to work with was Dual Purpose, and despite the rough start within the paper prototyping phase, we managed to get the project off the ground and work on it."
            },
            {
                heading: "What did I do within the project?",
                items: 
                [
                    "Player Movement",
                    "Player Burn Damage",
                    "Player Drains Health from Villager",
                    "Blood Dagger Logistics",
                    "Blood Dagger Sprites",
                    "Player Sprite",
                    "Music",
                    "Pick up Logistics",
                    "Sound Effects",
                    "Enemy AI",
                    "Opening Scene",
                ]
            },
            {
                heading: "Fun Fact",
                text: "This very game won at the school HvA GameJam for the Innovation category.",
                images: ["img/UntitledVampireGame/Winner.jpeg"]
            }
        ],
        tags: ["Unity", "C#", "5 people Team", "School 1 Week Jam", "HvA"],
        links: [ { label: "Play on Itch", url: "https://bon0na.itch.io/untitled-vampire-game"} ]
    }
};

const platform_icons = 
{
    "itch.io": "img/itch.png",
    "gamejolt.com": "img/gamejolt.png",
    "steampowered.com": "img/steam.png"
};

const modal = document.getElementById("project-modal");
const modal_img = document.getElementById("modal-img");
const modal_type = document.getElementById("modal-type");
const modal_title = document.getElementById("modal-title");
const modal_desc = document.getElementById("modal-desc");
const modal_details = document.getElementById("modal-details");
const modal_gallery = document.getElementById("modal-gallery");
const lightbox = document.getElementById("lightbox");
const lightbox_img = document.getElementById("lightbox-img");
const modal_tags = document.getElementById("modal-tags");
const modal_links = document.getElementById("modal-links");

function GetPlatformIcon(url)
{
    const host = new URL(url).hostname;
    for (const domain in platform_icons)
    {
        if (host === domain || host.endsWith("." + domain))
            return platform_icons[domain];
    }
    return null;
}

function BuildShots(sources, alt)
{
    const row = document.createElement("div");
    row.className = "modal-shots";

    for (const src of sources)
    {
        const img = document.createElement("img");

        img.src = src;
        img.alt = alt;
        img.className = "zoomable";
        row.append(img);
    }
    return row;
}

function OpenModal(id)
{
    const project = projects[id];
    if (!project) return;

    modal_img.src = project.image;
    modal_img.alt = project.title;
    modal_type.textContent = project.type;
    modal_title.textContent = project.title;
    modal_desc.textContent = project.description;
    modal_gallery.replaceChildren(...(project.gallery ? [BuildShots(project.gallery, project.title)] : []));

    modal_details.replaceChildren(...(project.details ?? []).map(section =>
    {
        const wrapper = document.createElement("div");
        wrapper.className = "modal-section";

        const heading = document.createElement("h4");
        heading.textContent = section.heading;
        wrapper.append(heading);

        if (section.text)
        {
            const p = document.createElement("p");
            p.textContent = section.text;
            wrapper.append(p);
        }

        if (section.items)
        {
            const list = document.createElement("ul");
            for (const item of section.items)
            {
                const li = document.createElement("li");
                li.textContent = item;
                list.append(li);
            }
            wrapper.append(list);
        }

        if (section.images)
            wrapper.append(BuildShots(section.images, section.heading));

        return wrapper;
    }));

    modal_links.replaceChildren(...project.links.map(link =>
    {
        const a = document.createElement("a");
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.className = "button button-secondary";

        const iconSrc = GetPlatformIcon(link.url);
        if (iconSrc)
        {
            const icon = document.createElement("img");
            icon.src = iconSrc;
            icon.alt = "";
            a.append(icon);
        }

        a.append(link.label);
        return a;
    }));

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function CloseModal()
{
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", true);
    document.body.style.overflow = "";
}

document.querySelectorAll(".project-link").forEach(button => 
{
    button.addEventListener("click", () => OpenModal(button.dataset.project));
});

document.querySelector(".modal-close").addEventListener("click", CloseModal);

modal.addEventListener("click", evt => 
{
    if (evt.target === modal) CloseModal();
});

document.addEventListener("keydown", evt => 
{
    if (evt.key !== "Escape") return;

    if (lightbox.classList.contains("open"))
        lightbox.classList.remove("open");
    else
        CloseModal();
});

modal.addEventListener("click", evt => 
{
    if (!evt.target.classList.contains("zoomable")) return;

    lightbox_img.src = evt.target.src;
    lightbox.classList.add("open");
});

lightbox.addEventListener("click", () => lightbox.classList.remove("open"));

const menu_toggle = document.querySelector(".menu-toggle");
const nav_links = document.querySelector(".nav-links");

menu_toggle.addEventListener("click", () =>
{
    const open = nav_links.classList.toggle("active");
    menu_toggle.setAttribute("aria-expanded", open);
});

nav_links.querySelectorAll("a").forEach(link =>
{
    link.addEventListener("click", () =>
    {
        nav_links.classList.remove("active");
        menu_toggle.setAttribute("aria-expanded", "false");
    });
});

document.getElementById("year").textContent = new Date().getFullYear();

