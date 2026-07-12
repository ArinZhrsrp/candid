      // ---------- STATE ----------
      const state = {
        aspect: "9:16",
        povType: "hand",
        angle: "random",
        hold: "handheld",
        style: "lifestyle",
        model: "woman",
        outfit: "casual",
        outfitColor: "black",
        flash: "off",
        time: "day",
        location: "bedroom",
        ambience: "cozy",
        weather: "sunny",
        hijab: "unspecified",
        skintone: "random",
        agerange: "young",
        camerastyle: "random",
        kawaii: "off",
        textbanner: "off",
        keepBg: "off",
        outputType: "image",
        platform: "none",
        promptFormat: "narrative",
        keepProduct: "off",
        storyboardStyle: "nodesc",
        panelNumber: "on",
        basedOnSheet: "off",
        storyboardMode: "off",
        artStyle: "photoreal",
        socialMode: "auto",
        autoCaption: "on",
        captionLanguage: "auto",
        productCategory: "auto",
        multiImage: "off",
        storyboardFromExisting: "off",
        textbannerStyle: "sticker",
      };
      const defaultState = { ...state };
      let lastState = null;
      let lastFrames = [];

      // ---------- PRODUCT CATEGORY SYSTEM ----------
      const globalCategoryMap = {
        "Kecantikan & Skincare": [
          "skintific",
          "serum",
          "moisturizer",
          "toner",
          "sunscreen",
          "cleanser",
          "facewash",
          "masker",
          "scrub",
          "essence",
          "ampoule",
          "pelembab",
          "sunblock",
          "micellar",
          "exfoliator",
          "skincare",
        ],
        "Kosmetik & Mekap": [
          "lipstick",
          "lipmatte",
          "liptint",
          "lipbalm",
          "lipgloss",
          "gincu",
          "foundation",
          "cushion",
          "primer",
          "concealer",
          "blusher",
          "eyeliner",
          "mascara",
          "eyeshadow",
          "eyebrow",
          "celak",
          "eyelash",
          "makeup",
          "mekap",
        ],
        "Penjagaan Diri & Mandian": [
          "shampoo",
          "syampu",
          "conditioner",
          "hair oil",
          "body wash",
          "shower gel",
          "soap",
          "sabun",
          "deodorant",
          "ubat gigi",
          "toothpaste",
          "berus gigi",
          "toothbrush",
          "losyen",
          "lotion",
          "hand cream",
          "body mist",
        ],
        "Minyak Wangi & Aromaterapi": [
          "perfume",
          "minyak wangi",
          "cologne",
          "fragrance",
          "scented",
          "lilin wangi",
          "candle",
          "diffuser",
          "humidifier",
          "essential oil",
        ],
        "Gajet & Peranti Pintar": [
          "phone",
          "smartphone",
          "telefon",
          "iphone",
          "samsung",
          "oppo",
          "vivo",
          "xiaomi",
          "realme",
          "huawei",
          "laptop",
          "notebook",
          "tablet",
          "ipad",
          "pc",
          "computer",
          "komputer",
          "monitor",
          "cpu",
          "tv",
          "television",
        ],
        "Aksesori Telefon & Komputer": [
          "casing",
          "phonecase",
          "powerbank",
          "charger",
          "kabel",
          "cable",
          "usb",
          "adapter",
          "mouse",
          "keyboard",
          "holder",
          "stand",
          "tripod",
          "ringlight",
          "extension",
          "plug",
          "socket",
          "power strip",
        ],
        "Gaming & Konsol": [
          "nintendo",
          "switch",
          "ps5",
          "playstation",
          "xbox",
          "gaming",
          "joystick",
          "console",
          "gamepad",
          "gaming chair",
        ],
        "Audio & Fotografi": [
          "headphone",
          "earphone",
          "airpods",
          "earbuds",
          "speaker",
          "mic",
          "microphone",
          "camera",
          "kamera",
          "webcam",
          "lens",
        ],
        "Minuman & Barangan Hidrasi": [
          "botol air",
          "water bottle",
          "tumbler",
          "flask",
          "thermos",
          "mug",
          "cawan",
          "gelas",
          "kopi",
          "coffee",
          "matcha",
          "tea",
          "teh",
          "juice",
          "jus",
          "susu",
          "milk",
          "boba",
          "sirap",
          "soda",
          "coke",
        ],
        "Makanan, Snek & Bahan Masak": [
          "sambal",
          "cookies",
          "biskut",
          "kerepek",
          "chips",
          "chocolate",
          "coklat",
          "ramen",
          "mee",
          "noodle",
          "kacang",
          "popcorn",
          "kek",
          "cake",
          "roti",
          "bread",
          "madu",
          "honey",
          "pes",
          "paste",
          "rempah",
          "sos",
          "sauce",
          "kicap",
          "maggi",
        ],
        "Pakaian & Fesyen Moden": [
          "baju",
          "tshirt",
          "shirt",
          "blouse",
          "dress",
          "skirt",
          "seluar",
          "pants",
          "jeans",
          "slacks",
          "jacket",
          "hoodie",
          "cardigan",
          "sweater",
          "kemeja",
          "jersey",
          "jersi",
          "singlet",
          "coat",
          "blazer",
        ],
        "Pakaian Tradisional & Hijab": [
          "baju kurung",
          "jubah",
          "kebaya",
          "kurta",
          "sampin",
          "tudung",
          "hijab",
          "shawl",
          "bawal",
          "inner",
          "anak tudung",
        ],
        "Beg & Aksesori Simpanan": [
          "handbag",
          "backpack",
          "wallet",
          "purse",
          "beg",
          "bag",
          "tote bag",
          "clutch",
          "sling bag",
          "luggage",
          "beg bagasi",
        ],
        "Kasut & Stoking": [
          "kasut",
          "shoes",
          "sneakers",
          "sandals",
          "selipar",
          "slippers",
          "heels",
          "wedges",
          "socks",
          "stoking",
          "boot",
        ],
        "Aksesori Diri & Barang Kemas": [
          "tali pinggang",
          "belt",
          "topi",
          "cap",
          "hat",
          "jam tangan",
          "watch",
          "cincin",
          "ring",
          "rantai",
          "necklace",
          "subang",
        ],
        "Bilik Tidur & Tekstil Rumah": [
          "selimut",
          "blanket",
          "cadar",
          "bedsheet",
          "bantal",
          "pillow",
          "tilam",
          "mattress",
          "curtain",
          "langsir",
          "carpet",
          "karpet",
          "rug",
          "towel",
          "tuala",
        ],
        "Perabot & Susun Atur Rumah": [
          "organizer",
          "rak",
          "rack",
          "kotak storan",
          "meja",
          "table",
          "desk",
          "kerusi",
          "chair",
          "sofa",
          "almari",
          "wardrobe",
        ],
        "Peralatan Dapur & Memasak": [
          "kuali",
          "pan",
          "pot",
          "periuk",
          "pinggan",
          "plate",
          "bowl",
          "mangkuk",
          "sudu",
          "garpu",
          "spoon",
          "fork",
          "pisau",
          "knife",
          "tupperware",
        ],
        "Barangan Haiwan Peliharaan": [
          "makanan kucing",
          "cat food",
          "kibbles",
          "wet food",
          "snek kucing",
          "makanan hamster",
          "kacang hamster",
          "bedding hamster",
          "cat litter",
          "pasir kucing",
          "sangkar",
          "cage",
        ],
        "Alat Tulis & Mainan": [
          "plushie",
          "patung",
          "toy",
          "mainan",
          "keychain",
          "sticker",
          "pelekat",
          "notebook",
          "diary",
          "planner",
          "journal",
          "pen",
          "pensel",
          "pencil",
          "stationery",
        ],
      };

      // Per-category prompt hints — steers background, scene, mood toward what suits the product type.
      const categoryPromptHints = {
        "Kecantikan & Skincare":
          "clean minimal vanity or bathroom counter setting, dewy soft lighting, fresh spa-like aesthetic emphasizing skin glow and texture",
        "Kosmetik & Mekap":
          "glam vanity setting with a mirror and soft ring-light glow, emphasis on color payoff and swatches, beauty-editorial mood",
        "Penjagaan Diri & Mandian":
          "fresh clean bathroom setting, water droplets and lather cues, hygienic refreshing mood",
        "Minyak Wangi & Aromaterapi":
          "elegant moody setting with soft shadows and warm ambient glow, luxurious sensory atmosphere",
        "Gajet & Peranti Pintar":
          "clean modern tech desk setup, sleek minimal surfaces, crisp lighting emphasizing the device design and screen",
        "Aksesori Telefon & Komputer":
          "modern desk or workspace context showing the accessory in use with a device, practical clean setup",
        "Gaming & Konsol":
          "cozy gaming setup with ambient RGB glow, dynamic energetic mood",
        "Audio & Fotografi":
          "creative workspace or on-the-go setting, emphasis on premium build and detail, crisp lighting",
        "Minuman & Barangan Hidrasi":
          "lifestyle desk, gym, or outdoor setting showing hydration in daily use, fresh condensation or steam cues",
        "Makanan, Snek & Bahan Masak":
          "appetizing kitchen or dining table setting, warm inviting food-photography lighting, emphasis on texture and freshness",
        "Pakaian & Fesyen Moden":
          "OOTD lifestyle or clean studio setting, full styling context, fashion-editorial mood",
        "Pakaian Tradisional & Hijab":
          "elegant modest-fashion styling in a tasteful setting, graceful drape and fabric detail, culturally appropriate presentation",
        "Beg & Aksesori Simpanan":
          "OOTD or lifestyle setting showing the bag styled with an outfit, emphasis on material and hardware detail",
        "Kasut & Stoking":
          "street or lifestyle setting showing the footwear worn and styled, dynamic angles emphasizing the silhouette",
        "Aksesori Diri & Barang Kemas":
          "close-up styled shots emphasizing shine, material, and detail, elegant lifestyle context",
        "Bilik Tidur & Tekstil Rumah":
          "cozy bedroom or home setting, soft warm lighting, comfortable inviting mood emphasizing texture and comfort",
        "Perabot & Susun Atur Rumah":
          "clean organized home setting showing the item in a real living context, before/after tidiness cues",
        "Peralatan Dapur & Memasak":
          "bright kitchen setting showing the item in cooking use, practical appetizing context",
        "Barangan Haiwan Peliharaan":
          "warm cozy home setting with a happy pet nearby, caring wholesome mood",
        "Alat Tulis & Mainan":
          "playful cute desk or shelf setting, colorful cheerful mood emphasizing charm and detail",
        Umum: "",
      };

      function detectAdvancedCategory(productName) {
        if (!productName) return "Umum";
        const name = productName.toLowerCase().trim();
        for (const [category, keywords] of Object.entries(globalCategoryMap)) {
          for (const keyword of keywords) {
            if (name.includes(keyword)) return category;
          }
        }
        return "Umum";
      }

      function getActiveCategory() {
        if (state.productCategory && state.productCategory !== "auto")
          return state.productCategory;
        const combined =
          document.getElementById("productType").value +
          " " +
          document.getElementById("productName").value;
        return detectAdvancedCategory(combined);
      }

      const platformConfig = {
        none: { aspect: null, phrase: "", phraseImage: "" },
        tiktok: {
          aspect: "9:16",
          phrase:
            "vertical short-form mobile video, aesthetic and eye-catching",
          phraseImage:
            "vertical mobile-first photo composition, aesthetic and eye-catching",
        },
        igreels: {
          aspect: "9:16",
          phrase:
            "vertical short-form social video, aesthetic and polished presentation",
          phraseImage:
            "vertical social-media photo composition, aesthetic and polished presentation",
        },
        igfeed: {
          aspect: "1:1",
          phrase:
            "clean, aesthetically curated square-format social media photo",
          phraseImage:
            "clean, aesthetically curated square-format social media photo",
        },
        facebook: {
          aspect: "4:3",
          phrase: "approachable, relatable social media post style",
          phraseImage: "approachable, relatable social media post style",
        },
        shopeelazada: {
          aspect: "1:1",
          phrase:
            "clean e-commerce listing photo style for an online marketplace product gallery, clear product visibility",
          phraseImage:
            "clean e-commerce listing photo style for an online marketplace product gallery, clear product visibility",
        },
        ytshorts: {
          aspect: "9:16",
          phrase: "vertical short-form video, mobile-first presentation",
          phraseImage: "vertical mobile-first photo composition",
        },
      };

      // POV types that only make sense with certain locations. Single-item = forced/locked location.
      // Multi-item = several valid locations allowed, but incompatible ones (e.g. outdoor) are hidden.
      const povLocationAllowed = {
        car: ["carinterior"],
        gettingready: ["bathroom"],
        mirror: ["bedroom"],
        walkingoutdoor: ["outdoorbg"],
        walkingindoor: [
          "bedroom",
          "rug",
          "vanity",
          "kitchen",
          "office",
          "cafe",
          "livingroom",
          "bathroom",
        ],
      };

      // Angle/shot ids that contradict a given POV type (e.g. a Selfie can't logically be shot Top-Down,
      // a Full Body shot can't be Extreme Close-Up). These are hidden from the Angle field when that POV is active.
      const povAngleExclude = {
        hand: ["ots"],
        selfie: [
          "topdown",
          "lowangle",
          "highangle",
          "orbit",
          "crane",
          "tracking",
          "ews",
          "ots",
        ],
        headshot: ["macro", "ecu", "topdown", "ews", "ots"],
        fullbody: ["macro", "ecu", "closeup"],
        mirror: ["macro", "ecu", "topdown"],
        reaction: ["fullwide", "ews", "topdown", "orbit", "crane", "ots"],
        overhead: ["lowangle", "ots"],
        walkingindoor: ["topdown"],
        walkingoutdoor: ["topdown"],
        car: ["topdown", "fullwide", "ews", "crane"],
        unboxing: ["fullwide", "ews", "ots"],
        gettingready: ["ews"],
        overshoulder: ["macro", "ecu", "topdown", "ews", "orbit", "ots"],
      };

      // ---------- CATEGORY DROPDOWN WIRING ----------
      (function initCategoryDropdown() {
        const group = document.getElementById("categoryPillGroup");
        Object.keys(globalCategoryMap).forEach((cat) => {
          const btn = document.createElement("button");
          btn.className = "pill";
          btn.dataset.value = cat;
          btn.textContent = cat;
          group.appendChild(btn);
        });
        const umum = document.createElement("button");
        umum.className = "pill";
        umum.dataset.value = "Umum";
        umum.textContent = "Umum / Lain-lain";
        group.appendChild(umum);

        document
          .getElementById("categoryToggle")
          .addEventListener("click", () => {
            document.getElementById("categoryPanel").classList.toggle("show");
          });
      })();

      function updateCategoryToggleLabel() {
        const toggle = document.getElementById("categoryToggle");
        const label =
          state.productCategory === "auto"
            ? "Auto-Detect"
            : state.productCategory;
        toggle.textContent = `🏷️ Kategori: ${label} ▾`;
      }

      function updateCategoryNote() {
        const note = document.getElementById("categoryDetectNote");
        if (state.productCategory === "auto") {
          const combined =
            document.getElementById("productType").value +
            " " +
            document.getElementById("productName").value;
          const detected = detectAdvancedCategory(combined);
          note.textContent =
            detected === "Umum"
              ? 'Auto-Detect: belum dapat kesan kategori — isi "Jenis Barang" atau nama produk yang lebih spesifik, atau pilih manual.'
              : `Auto-Detect: dikesan sebagai "${detected}". Prompt akan disesuaikan ikut kategori ni. (Boleh override manual.)`;
        } else {
          note.textContent = `Kategori manual: "${state.productCategory}". Prompt akan disesuaikan ikut kategori ni.`;
        }
        updateCategoryToggleLabel();
      }

      document.getElementById("productName").addEventListener("input", () => {
        if (state.productCategory === "auto") updateCategoryNote();
        currentProductScenes = [];
      });
      document.getElementById("productType").addEventListener("input", () => {
        if (state.productCategory === "auto") updateCategoryNote();
        currentProductScenes = [];
      });

      // ---------- PILL / COLOR GROUP HANDLING ----------
      document
        .querySelectorAll(".pill-group, .color-group")
        .forEach((group) => {
          const key = group.dataset.group;
          const isMulti = group.dataset.multi === "true";
          group.addEventListener("click", (e) => {
            const btn = e.target.closest(".pill, .swatch");
            if (!btn || btn.hasAttribute("disabled")) return;
            if (isMulti) {
              btn.classList.toggle("active");
            } else {
              group
                .querySelectorAll(".pill, .swatch")
                .forEach((p) => p.classList.remove("active"));
              btn.classList.add("active");
              state[key] = btn.dataset.value;
              if (key === "outputType" || key === "storyboardMode")
                updateQuantityUI();
              if (key === "platform" && platformConfig[state.platform].aspect) {
                setPillValue("aspect", platformConfig[state.platform].aspect);
              }
              if (key === "povType") {
                const allowed = povLocationAllowed[state.povType];
                if (allowed && !allowed.includes(state.location)) {
                  setPillValue("location", allowed[0]);
                }
              }
              if (key === "platform" || key === "aspect") {
                try {
                  localStorage.setItem("candid-pref-" + key, state[key]);
                } catch (e) {}
              }
              if (key === "productCategory") updateCategoryNote();
            }
            updateVisibility();
          });
        });

      function updateQuantityUI() {
        document.getElementById("quantityValue").textContent =
          document.getElementById("quantityInput").value;
        document.getElementById("storyboardDurationValue").textContent =
          document.getElementById("storyboardDurationInput").value;
        document.getElementById("videoDurationValue").textContent =
          document.getElementById("videoDurationInput").value;
      }

      document.getElementById("quantityInput").addEventListener("input", () => {
        document.getElementById("quantityValue").textContent =
          document.getElementById("quantityInput").value;
      });

      document
        .getElementById("storyboardDurationInput")
        .addEventListener("input", () => {
          document.getElementById("storyboardDurationValue").textContent =
            document.getElementById("storyboardDurationInput").value;
        });

      document
        .getElementById("videoDurationInput")
        .addEventListener("input", () => {
          document.getElementById("videoDurationValue").textContent =
            document.getElementById("videoDurationInput").value;
        });

      function getQuantity() {
        if (state.outputType === "image" && state.storyboardMode === "on") {
          const input = document.getElementById("quantityInput");
          let v = parseInt(input.value, 10) || 6;
          v = Math.max(2, Math.min(20, v));
          input.value = v;
          document.getElementById("quantityValue").textContent = v;
          return v;
        }
        return 1;
      }

      function getStoryboardDuration() {
        return (
          parseInt(
            document.getElementById("storyboardDurationInput").value,
            10,
          ) || 15
        );
      }

      function getVideoDuration() {
        return (
          parseInt(document.getElementById("videoDurationInput").value, 10) ||
          10
        );
      }

      // Distribute a total duration evenly across n scenes, returning per-scene seconds (1 decimal).
      function distributeDurations(totalSeconds, count) {
        const base = Math.floor((totalSeconds / count) * 10) / 10;
        const durations = Array(count).fill(base);
        let remainder = Math.round((totalSeconds - base * count) * 10) / 10;
        let i = 0;
        while (remainder > 0.05 && i < count) {
          durations[i] = Math.round((durations[i] + 0.1) * 10) / 10;
          remainder = Math.round((remainder - 0.1) * 10) / 10;
          i++;
        }
        return durations;
      }

      function getMultiValues(groupKey) {
        const group = document.querySelector(`[data-group="${groupKey}"]`);
        return Array.from(group.querySelectorAll(".pill.active")).map(
          (p) => p.dataset.value,
        );
      }

      function setPillValue(groupKey, value) {
        const group = document.querySelector(`[data-group="${groupKey}"]`);
        if (!group) return;
        const target = group.querySelector(`[data-value="${value}"]`);
        if (!target) return;
        group
          .querySelectorAll(".pill, .swatch")
          .forEach((p) => p.classList.remove("active"));
        target.classList.add("active");
        state[groupKey] = value;
      }

      // ---------- AUTO SCENE DETECTION ----------
      const categoryRules = [
        {
          name: "Makeup & Skincare",
          keywords: [
            "mascara",
            "lipstick",
            "lip tint",
            "lip serum",
            "blush",
            "powder",
            "foundation",
            "concealer",
            "eyeshadow",
            "serum",
            "skincare",
            "skin care",
            "cream",
            "toner",
            "sunscreen",
            "moisturizer",
            "retinol",
            "sunblock",
          ],
          settings: {
            location: "vanity",
            ambience: "pastel",
            hold: "handheld",
            style: "lifestyle",
          },
          sceneHints: [
            "sitting at a vanity table, gently applying the product while glancing at the mirror with a soft satisfied smile",
            "dabbing a small amount onto the back of the hand to show texture before application",
            "holding the product up to natural window light, admiring the packaging",
            "swatching the product on the wrist with a happy, satisfied expression",
            "applying the product with eyes closed, enjoying a relaxing self-care moment",
            "comparing the product against a mirror reflection, softly smiling",
          ],
        },
        {
          name: "Botol & Tumbler",
          keywords: ["tumbler", "bottle", "flask", "botol", "mug", "cup"],
          settings: {
            location: "kitchen",
            ambience: "bright",
            hold: "handheld",
            style: "lifestyle",
          },
          sceneHints: [
            "casually sipping from the bottle while relaxing at home, the tumbler catching soft light",
            "carrying the tumbler while walking, sunlight catching the condensation on the surface",
            "placing the tumbler on the desk mid work session, taking a short break",
            "clinking the tumbler lightly in a cheers-like gesture with a smile",
            "pouring a drink into the tumbler, ice cubes visible inside",
            "holding the tumbler close, condensation visible, cozy relaxed vibe",
          ],
        },
        {
          name: "Beg & Aksesori Fesyen",
          keywords: [
            "bag",
            "beg",
            "wallet",
            "dompet",
            "purse",
            "sling",
            "handbag",
          ],
          settings: {
            location: "bedroom",
            ambience: "cozy",
            hold: "placedtable",
            style: "lifestyle",
          },
          sceneHints: [
            "slinging the bag over the shoulder while getting ready to head out the door",
            "opening the bag to check its contents before leaving",
            "posing with the bag against a mirror, admiring the outfit pairing",
            "walking with the bag swinging gently at the side",
            "placing the bag on a chair, styled next to an outfit flat-lay",
            "holding the bag up to clearly show the front design",
          ],
        },
        {
          name: "Gajet & Elektronik",
          keywords: [
            "phone",
            "gadget",
            "earphone",
            "earbud",
            "charger",
            "cable",
            "laptop",
            "camera",
            "speaker",
            "powerbank",
          ],
          settings: {
            location: "office",
            ambience: "minimalist",
            hold: "handheld",
            style: "studio",
          },
          sceneHints: [
            "unboxing the item on a clean desk, examining it closely with an impressed expression",
            "setting up the device for the first time with a curious expression",
            "comparing the gadget's size against the hand for scale",
            "using the gadget mid-task with a focused expression",
            "showing the gadget's screen or interface lighting up",
            "packing the gadget neatly back into its box",
          ],
        },
        {
          name: "Makanan & Minuman",
          keywords: [
            "snack",
            "food",
            "drink",
            "coffee",
            "kopi",
            "tea",
            "teh",
            "minuman",
            "makanan",
            "biskut",
            "cookie",
          ],
          settings: {
            location: "cafe",
            ambience: "bright",
            hold: "handheld",
            style: "lifestyle",
          },
          sceneHints: [
            "enjoying the snack or drink at a cafe table, relaxed and candid",
            "taking a first bite or sip with a satisfied reaction",
            "sharing the snack with a friend off-camera, joyful mood",
            "unwrapping the packaging eagerly",
            "holding the item up in a toast-like gesture",
            "arranging the snack neatly on a plate before eating",
          ],
        },
        {
          name: "Wangian",
          keywords: ["perfume", "fragrance", "wangian", "cologne", "eau de"],
          settings: {
            location: "vanity",
            ambience: "luxury",
            hold: "handheld",
            style: "studio",
          },
          sceneHints: [
            "spritzing the fragrance onto the wrist and admiring the bottle in soft light",
            "holding the bottle up to the light to admire the liquid color",
            "dabbing a small amount onto the neck with eyes closed",
            "smelling the cap after a light spray, satisfied expression",
            "placing the bottle on a vanity next to fresh flowers",
            "admiring the bottle's cap design up close",
          ],
        },
      ];
      const defaultCategorySettings = {
        name: "Umum",
        settings: {
          location: "bedroom",
          ambience: "cozy",
          hold: "handheld",
          style: "lifestyle",
        },
        sceneHints: [
          "casually holding and examining the product, a natural everyday moment",
          "showing the product to the camera with a warm smile",
          "placing the product down gently in a natural motion",
          "picking the product up for the first time with curiosity",
          "comparing the product against its packaging box",
          "holding the product at chest height in a natural candid pose",
        ],
      };

      let suggestedSceneCount = 0;
      const usedSceneTexts = new Set();

      // ---------- CREATIVE SCENE POOL (Multi-Template Structural Alternator) ----------
      const creativePool = {
        angles: [
          "A cinematic close-up shot of",
          "A dramatic macro shot focusing on",
          "A top-down flat-lay presentation of",
          "An eye-level tracking shot of",
          "A low-angle dynamic perspective of",
          "A beautifully framed studio shot of",
          "A slow panning sequence capturing",
          "A crisp high-depth shadow shot of",
          "A smooth over-the-shoulder view of",
          "An artistic silhouette shot of",
          "A wide cinematic frame displaying",
          "A handheld candid camera movement focusing on",
        ],
        categoryActions: {
          "Kecantikan & Skincare": [
            "the smooth liquid texture of {product} slowly dripping down a wet marble surface",
            "a hand gently opening the premium cap of {product} under a soft glow",
            "the rich cream texture of {product} being swatched smoothly onto clean skin",
            "tiny water droplets glistening on the sleek bottle of {product}",
            "a delicate layer of {product} being poured onto a transparent glass plate",
          ],
          "Kosmetik & Mekap": [
            "the vibrant color payoff of {product} being swatched across the back of a hand",
            "a hand elegantly twisting open {product} in front of a soft-lit mirror",
            "{product} being applied with a smooth, confident motion",
            "the fine shimmer and pigment of {product} catching the light up close",
            "{product} arranged neatly among a curated flat-lay of beauty tools",
          ],
          "Aksesori Telefon & Komputer": [
            "a trendy mirror selfie proudly showcasing the unique design details of {product}",
            "a hand effortlessly snapping {product} onto a sleek electronic device",
            "the premium tactile texture and clean edges of {product} catching the light",
            "someone neatly arranging {product} onto a dark felt desk mat",
            "a close-up highlighting the precise cutouts and durable material of {product}",
          ],
          "Minuman & Barangan Hidrasi": [
            "cold condensation slowly forming on the surface of {product}",
            "a hand lifting {product} for a refreshing sip in warm daylight",
            "{product} being filled slowly as steam or ice swirls inside",
            "the sleek silhouette of {product} standing on a sunlit table",
            "{product} placed beside a laptop and notebook in a cozy workspace",
          ],
          "Kasut & Stoking": [
            "a dynamic stride showing {product} in motion on a textured street",
            "{product} being laced up in a crisp close-up",
            "the material detail and stitching of {product} catching side light",
            "{product} styled with an outfit in a full-body OOTD frame",
            "a clean top-down flat-lay of {product} beside styling accessories",
          ],
          "Beg & Aksesori Simpanan": [
            "{product} styled over the shoulder in a candid OOTD walk",
            "the hardware and material detail of {product} catching soft light",
            "a hand opening {product} to reveal its interior compartments",
            "{product} placed elegantly on a marble surface with soft props",
            "a full-body frame showing {product} completing a stylish look",
          ],
          "Makanan, Snek & Bahan Masak": [
            "a mouth-watering close-up of {product} with fresh textural detail",
            "{product} being served or plated in warm inviting light",
            "a hand reaching for {product} in a cozy candid moment",
            "{product} arranged among fresh complementary ingredients",
            "steam or crumbs captured mid-motion around {product}",
          ],
          Umum: [
            "someone gently interacting with {product} in a completely natural motion",
            "{product} being unboxed carefully to reveal its premium craftsmanship",
            "a hand lifting {product} up to examine its details with genuine curiosity",
            "{product} being placed down softly on a clean, elegant surface",
            "a beautiful presentation displaying the core elements of {product}",
          ],
        },
        environments: [
          "inside a bright, minimalist modern studio",
          "against a cozy pastel room backdrop",
          "on a sleek, polished concrete pedestal",
          "inside a beautifully sunlit aesthetic café",
          "surrounded by subtle organic elements like fresh white petals",
          "on a clean, organized Scandinavian wooden table",
          "set against an elegant textured backdrop with high-depth shadows",
          "in a cozy corner filled with warm, inviting decor",
        ],
        lighting: [
          "soft morning sunlight pouring through a window",
          "gentle, professional studio softbox lighting",
          "beautiful golden hour rays",
          "a bright, clean natural daylight setup",
          "subtle dramatic shadows and soft ambient illumination",
          "a moody, premium warm studio light configuration",
        ],
        aesthetics: [
          "creating a high-end luxury brand aesthetic",
          "exuding a very cozy studio and calm lifestyle vibe",
          "highlighting a sleek, futuristic tech presentation",
          "showcasing a beautiful minimalist zen environment",
          "giving off a raw, authentic, and modern editorial look",
          "perfectly framing a clean, premium commercial presentation",
        ],
        atmospheres: [
          "with an unposed, real-world atmosphere.",
          "capturing a genuine, candid everyday moment.",
          "infused with a warm, serene, and sophisticated mood.",
          "evoking a premium, highly professional commercial feeling.",
          "with a touch of quiet elegance and artistic depth.",
          "bringing out a lively, fresh, and modern creative mood.",
        ],
      };

      function generateTenUniqueScenes(productName, category) {
        const name = productName ? productName.trim() : "the product";
        const selectedCategory = creativePool.categoryActions[category]
          ? category
          : "Umum";
        const pool = {
          angles: [...creativePool.angles],
          actions: [...creativePool.categoryActions[selectedCategory]],
          environments: [...creativePool.environments],
          lighting: [...creativePool.lighting],
          aesthetics: [...creativePool.aesthetics],
          atmospheres: [...creativePool.atmospheres],
        };
        function pullRandom(array, refill) {
          if (array.length === 0) array.push(...refill);
          const index = Math.floor(Math.random() * array.length);
          return array.splice(index, 1)[0];
        }
        const scenes = [];
        for (let i = 1; i <= 10; i++) {
          const angle = pullRandom(pool.angles, creativePool.angles);
          const action = pullRandom(
            pool.actions,
            creativePool.categoryActions[selectedCategory],
          ).replace("{product}", name);
          const env = pullRandom(pool.environments, creativePool.environments);
          const light = pullRandom(pool.lighting, creativePool.lighting);
          const aes = pullRandom(pool.aesthetics, creativePool.aesthetics);
          const atm = pullRandom(pool.atmospheres, creativePool.atmospheres);
          let sentence = "";
          switch (i % 4) {
            case 0:
              sentence = `${angle} ${action}. Captured ${env} under ${light}, ${atm}`;
              break;
            case 1:
              sentence = `Set ${env}, ${light} beautifully highlights ${action}. ${angle} the scene, ${aes}, ${atm}`;
              break;
            case 2:
              sentence = `${action}, stylized ${env}. This shot, ${aes}, is lit with ${light}, ${atm}`;
              break;
            case 3:
              sentence = `${angle} ${action} ${env}. Bathed in ${light}, ${aes}, ${atm}`;
              break;
          }
          scenes.push(sentence.charAt(0).toUpperCase() + sentence.slice(1));
        }
        return scenes;
      }

      let currentProductScenes = [];

      function generateUniqueSceneSuggestion(hints) {
        const candidates = [];
        hints.forEach((h) => {
          candidates.push(h);
          moodWords.forEach((m) => candidates.push(`${h}, ${m} mood`));
        });
        const unused = candidates.filter((c) => !usedSceneTexts.has(c));
        const pool = unused.length ? unused : candidates;
        const chosen = pick(pool);
        usedSceneTexts.add(chosen);
        return chosen;
      }

      function addSuggestedScenes(hints, count) {
        const list = document.getElementById("suggestedScenesList");
        let html = "";
        for (let i = 0; i < count; i++) {
          suggestedSceneCount++;
          const text = generateUniqueSceneSuggestion(hints);
          const activeClass = suggestedSceneCount === 1 ? " active" : "";
          html += `<div class="scene-card${activeClass}" data-value="suggested-${suggestedSceneCount}"><div class="scene-card-title">🪄 Dicadangkan #${suggestedSceneCount}</div><div class="scene-card-text">${text}</div></div>`;
        }
        list.insertAdjacentHTML("beforeend", html);
      }

      const MAX_SUGGESTED_SCENES = 10;

      document.getElementById("autoSceneBtn").addEventListener("click", () => {
        const productType = document.getElementById("productType").value.trim();
        const note = document.getElementById("autoSceneNote");
        if (!productType) {
          note.style.display = "block";
          note.style.color = "var(--danger)";
          note.textContent =
            '⚠️ Sila isi "Jenis Barang" dahulu (cth: Lotion, Casing fon) supaya cadangan scene lebih tepat.';
          document.getElementById("productType").focus();
          return;
        }
        note.style.color = "";

        // detect category & apply matching visual settings (location/ambience/etc.)
        const text = (
          productType +
          " " +
          document.getElementById("productName").value +
          " " +
          document.getElementById("productDesc").value
        ).toLowerCase();
        const match =
          categoryRules.find((rule) =>
            rule.keywords.some((k) => text.includes(k)),
          ) || defaultCategorySettings;
        Object.entries(match.settings).forEach(([k, v]) => setPillValue(k, v));
        updateVisibility();

        note.style.display = "block";

        // reflect user's own scene card
        const userSceneText = document.getElementById("userScene").value.trim();
        document.getElementById("sceneCardUserText").textContent =
          userSceneText;
        const userCard = document.getElementById("sceneCardUser");
        if (userSceneText) {
          userCard.classList.remove("hidden");
          userCard.classList.add("active");
        } else {
          userCard.classList.add("hidden");
          userCard.classList.remove("active");
        }

        // generate the 10 unique creative scenes once (using the detected 20-type category + product name)
        if (suggestedSceneCount === 0 || currentProductScenes.length === 0) {
          const catForScenes = getActiveCategory();
          const productLabel =
            document.getElementById("productName").value.trim() || productType;
          currentProductScenes = generateTenUniqueScenes(
            productLabel,
            catForScenes,
          );
        }

        if (suggestedSceneCount >= MAX_SUGGESTED_SCENES) {
          note.textContent = `✓ Kategori: "${match.name}". Maksimum ${MAX_SUGGESTED_SCENES} cadangan scene dah tercapai.`;
          document.getElementById("sceneChoices").classList.remove("hidden");
          return;
        }

        const sceneText = currentProductScenes[suggestedSceneCount];
        suggestedSceneCount++;
        const list = document.getElementById("suggestedScenesList");
        const activeClass = suggestedSceneCount === 1 ? " active" : "";
        list.insertAdjacentHTML(
          "beforeend",
          `<div class="scene-card${activeClass}" data-value="suggested-${suggestedSceneCount}"><div class="scene-card-title">🪄 Dicadangkan #${suggestedSceneCount}</div><div class="scene-card-text">${sceneText}</div></div>`,
        );

        note.textContent = `✓ Kategori: "${match.name}" — cadangan #${suggestedSceneCount}/10 ditambah. Klik lagi untuk cadangan berbeza.`;
        document.getElementById("sceneChoices").classList.remove("hidden");
      });

      document.getElementById("sceneChoices").addEventListener("click", (e) => {
        const card = e.target.closest(".scene-card");
        if (!card) return;
        const activeCount = document.querySelectorAll(
          ".scene-card.active:not(.hidden)",
        ).length;
        if (!card.classList.contains("active") && activeCount >= 5) {
          const limitNote = document.getElementById("sceneLimitNote");
          limitNote.style.display = "block";
          setTimeout(() => {
            limitNote.style.display = "none";
          }, 2000);
          return;
        }
        card.classList.toggle("active");
      });

      function getSelectedSceneText() {
        const parts = [];
        document
          .querySelectorAll(".scene-card.active:not(.hidden)")
          .forEach((card) => {
            const text = card
              .querySelector(".scene-card-text")
              .textContent.trim();
            if (text) parts.push(text);
          });
        // One prompt = one scene. Multiple selected scenes are used as a rotation pool,
        // picking one at random each generate — never concatenated (contradictory directions crop/confuse the image).
        if (!parts.length) return "";
        return pick(parts);
      }

      function updateVisibility() {
        const noModel = state.model === "none";
        const isMascot = state.model === "mascot";
        document
          .getElementById("outfitField")
          .classList.toggle("hidden", noModel || isMascot);
        document
          .getElementById("hijabField")
          .classList.toggle("hidden", noModel || state.model !== "woman");
        document
          .getElementById("ageField")
          .classList.toggle("hidden", noModel || isMascot);
        document.getElementById("mascotNote").style.display = isMascot
          ? "block"
          : "none";

        // POV is a person/hand concept — irrelevant for a product-only ("None") shot.
        document
          .getElementById("povTypeField")
          .classList.toggle("hidden", noModel);

        // person-dependent POV types need a model (a mascot counts as a "model" here too)
        const personPovTypes = [
          "selfie",
          "thirdperson",
          "headshot",
          "fullbody",
          "mirror",
          "reaction",
          "overhead",
          "walkingindoor",
          "walkingoutdoor",
          "car",
          "gettingready",
          "unboxing",
          "overshoulder",
        ];
        const personPovBtnIds = [
          "povSelfie",
          "povThird",
          "povHeadshot",
          "povFullbody",
          "povMirror",
          "povReaction",
          "povOverhead",
          "povWalkingIndoor",
          "povWalkingOutdoor",
          "povCar",
          "povGettingReady",
          "povUnboxing",
          "povOverShoulder",
        ];
        personPovBtnIds.forEach((id) =>
          document.getElementById(id).toggleAttribute("disabled", noModel),
        );
        if (noModel && personPovTypes.includes(state.povType)) {
          state.povType = "hand";
          const povGroup = document.querySelector('[data-group="povType"]');
          povGroup
            .querySelectorAll(".pill")
            .forEach((p) => p.classList.remove("active"));
          povGroup.querySelector('[data-value="hand"]').classList.add("active");
        }

        // weather only relevant for outdoor
        const isOutdoor =
          state.style === "outdoor" || state.location === "outdoorbg";
        document
          .getElementById("weatherField")
          .classList.toggle("hidden", !isOutdoor || state.keepBg === "on");

        // Hide location options that would contradict the current POV type (e.g. "Dalam Kereta" only
        // makes sense with Car Interior; "Sedang Berjalan Indoor" allows several indoor locations but not Outdoor).
        const allowedLocations = povLocationAllowed[state.povType];
        document
          .querySelectorAll('[data-group="location"] .pill')
          .forEach((pill) => {
            const isAllowed =
              !allowedLocations ||
              allowedLocations.includes(pill.dataset.value);
            pill.classList.toggle("hidden", !isAllowed);
          });

        // Hide Angle/Shot options that would contradict the current POV type (e.g. Selfie can't be Top-Down,
        // Full Body can't be Extreme Close-Up). "Random" stays available and simply excludes these from its pool.
        const excludedAngles = povAngleExclude[state.povType] || [];
        document
          .querySelectorAll('[data-group="angle"] .pill')
          .forEach((pill) => {
            const val = pill.dataset.value;
            pill.classList.toggle(
              "hidden",
              val !== "random" && excludedAngles.includes(val),
            );
          });
        if (excludedAngles.includes(state.angle)) {
          setPillValue("angle", "random");
        }

        // custom clothing color text input
        document
          .getElementById("customColorInput")
          .classList.toggle("hidden", state.outfitColor !== "custom");

        // custom clothing style text input
        document
          .getElementById("customOutfitInput")
          .classList.toggle("hidden", state.outfit !== "custom");

        // text banner style field/custom input
        document
          .getElementById("textbannerStyleField")
          .classList.toggle("hidden", state.textbanner !== "on");
        document
          .getElementById("customTextStyleInput")
          .classList.toggle("hidden", state.textbannerStyle !== "custom");
        document
          .getElementById("customPlacementInput")
          .classList.toggle("hidden", state.hold !== "placedcustom");

        // Storyboard is image-only. Video is always standalone, with its own optional sheet-reference toggle.
        const isVideoType = state.outputType === "video";
        document
          .getElementById("imageStoryboardField")
          .classList.toggle("hidden", isVideoType || state.multiImage === "on");
        document
          .getElementById("multiImageField")
          .classList.toggle("hidden", isVideoType);
        document
          .getElementById("multiImageInputs")
          .classList.toggle("hidden", state.multiImage !== "on");
        document
          .getElementById("socialStudioField")
          .classList.toggle("hidden", state.storyboardStyle !== "socialstudio");
        document
          .getElementById("captionLanguageField")
          .classList.toggle("hidden", state.autoCaption !== "on");
        document
          .getElementById("videoSheetField")
          .classList.toggle("hidden", !isVideoType);

        document
          .getElementById("storyboardStyleField")
          .classList.toggle(
            "hidden",
            isVideoType || state.storyboardMode !== "on",
          );
        document
          .getElementById("storyboardBasedOnExistingField")
          .classList.toggle(
            "hidden",
            isVideoType || state.storyboardMode !== "on",
          );

        // When storyboard is based on an already-generated image, visual settings aren't needed — hide Section 04.
        const skipVisualSettings =
          !isVideoType &&
          state.storyboardMode === "on" &&
          state.storyboardFromExisting === "on";
        document
          .getElementById("visualSettingsSection")
          .classList.toggle("hidden", skipVisualSettings);

        // keep own background: hide fields that describe/generate a background
        const keepingOwnBg = state.keepBg === "on";
        document
          .getElementById("locationField")
          .classList.toggle("hidden", keepingOwnBg);
        document
          .getElementById("ambienceField")
          .classList.toggle("hidden", keepingOwnBg);
        document
          .getElementById("customBgField")
          .classList.toggle("hidden", keepingOwnBg);
        document
          .getElementById("propsField")
          .classList.toggle("hidden", keepingOwnBg);
      }

      function setupCollapsible(toggleId, panelId, pinId, storageKey) {
        const toggle = document.getElementById(toggleId);
        const panel = document.getElementById(panelId);
        const pin = document.getElementById(pinId);
        let pinned = false;
        try {
          pinned = localStorage.getItem(storageKey) === "true";
        } catch (e) {}
        pin.checked = pinned;
        if (pinned) panel.classList.add("show");

        toggle.addEventListener("click", () => {
          panel.classList.toggle("show");
        });
        pin.addEventListener("change", () => {
          try {
            localStorage.setItem(storageKey, pin.checked);
          } catch (e) {}
          if (pin.checked) panel.classList.add("show");
        });
      }
      setupCollapsible("advToggle", "advPanel", "advPin", "candid-pref-advpin");
      setupCollapsible(
        "kawaiiToggle",
        "kawaiiPanel",
        "kawaiiPin",
        "candid-pref-kawaiipin",
      );

      // ---------- VARIATION POOLS ----------
      const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

      // Comprehensive professional camera/shot-type library. Each id maps to a full descriptive phrase.
      const shotTypePhrases = {
        macro:
          "macro shot capturing extreme, microscopic detail (fabric weave, intricate stitching, or fine texture)",
        closeup:
          "close-up shot framing the entire product tightly, removing environmental distractions to force complete focus on the item",
        whippan:
          "whip pan — a fast, blurred camera pan creating a snappy, energetic transition",
        ecu: "extreme close-up (ECU) focusing intensely on one specific feature, like a logo, button, or small detail",
        mediumshot:
          "medium shot (MS) showing the product in relation to its immediate environment",
        fullwide:
          "full/wide shot (WS) establishing the entire scene, positioning the product within its lifestyle or environmental context",
        ews: "extreme wide shot (EWS) capturing an expansive space to establish a grand, high-end cinematic mood",
        eyelevel:
          "eye-level shot, camera perfectly level with the product, creating a neutral, honest, and realistic presentation",
        lowangle:
          "low-angle hero shot, camera looking up at the product, making it look powerful, premium, and monumental",
        highangle:
          "high-angle shot, camera looking down at the product, making it look sleek, compact, and accessible",
        topdown:
          "top-down bird's-eye flat-lay shot, camera looking straight down from directly above",
        dutch:
          "Dutch angle, camera noticeably tilted to one side for a modern, dynamic energy",
        orbit:
          "orbit shot (360°), camera circling completely around the stationary product to showcase it from every angle",
        pushin:
          "push-in (dolly in) shot, camera moving smoothly toward the product, drawing attention to a specific feature",
        pullout:
          "pull-out (dolly out) shot, camera moving away from the product, slowly revealing its surroundings or scale",
        pantilt:
          "standard pan & tilt, camera fixed in place while sweeping horizontally or vertically across the product",
        tracking:
          "tracking shot, camera moving alongside the product while it is in motion",
        crane:
          "crane/jib shot sweeping up and over the product, creating a dramatic, high-production-value reveal",
        ots: "over-the-shoulder shot, looking over the person's shoulder as they interact with the product",
        povshot:
          "point-of-view shot, camera acting as the eyes of the user, holding or operating the item directly",
        macroaction:
          "macro action shot capturing a high-speed physical reaction in close detail (e.g. liquid dripping, fingers moving)",
      };

      // Video-generation tools (Seedance, Kling, etc.) often flag "over the shoulder" / "point-of-view" / "POV" /
      // "first-person" during moderation. These two overrides describe the same shots without those trigger words.
      const shotTypePhrasesVideoSafe = {
        ...shotTypePhrases,
        ots: "angled shot from slightly behind the subject, looking toward the product as they interact with it",
        povshot:
          "immersive camera view simulating the user's own perspective while holding or operating the item",
      };

      const framingOptions = [
        "extreme close-up focusing tightly on the product's design detail and texture",
        "medium shot showing the full product clearly within its immediate surroundings",
        "wide establishing shot showing the product within the full styled desk setup",
        "top-down flat-lay framing showing the product centered from directly above",
        "three-quarter angled framing with the product leaning or propped against a nearby prop",
        "macro framing isolating just one corner or detail of the product",
        "off-center framing with generous negative space around the product",
      ];

      // When a person/hand is in frame (model !== none), framing must keep the subject FULLY visible —
      // macro/corner-isolating framings crop the hand and product in half.
      const framingOptionsWithPerson = [
        "medium shot framing that keeps the hand and the entire product fully visible in frame",
        "comfortable framing showing the whole product held naturally, nothing cropped or cut off",
        "slightly wide framing with the hand and product centered and fully in view",
        "balanced framing with the full product held clearly visible, with soft negative space around it",
        "three-quarter framing showing the product held at a natural angle, entirely within the frame",
      ];

      function shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      }

      const lightingPools = {
        day_off: [
          "soft diffused daylight coming through a nearby window",
          "warm natural afternoon light with gentle soft shadows",
          "bright even daylight with slightly airy, soft-overexposed highlights",
        ],
        day_on: [
          "daylight mixed with a subtle fill flash, crisp and clean",
          "bright daylight with a soft flash pop adding a highlight on the product",
          "natural light balanced with a gentle flash for extra clarity",
        ],
        night_off: [
          "warm ambient lamp light with soft shadows",
          "dim, cozy indoor lighting with a slightly moody tone",
          "low warm light from a bedside lamp, intimate atmosphere",
        ],
        night_on: [
          "harsh direct flash typical of a candid night-time snapshot",
          "bright on-camera flash creating hard shadows, authentic night-selfie feel",
          "raw flash photography look, slightly overexposed",
        ],
      };

      const weatherPhrases = {
        sunny: "under clear, sunny weather",
        overcast: "under soft, overcast diffused light",
        goldenhour: "during golden hour with warm sunset tones",
        rain: "just after rain, with a fresh, slightly wet look",
      };

      const handDetails = [
        "fingers wrapped naturally around the product",
        "hand tilted slightly so the label is visible",
        "thumb resting casually on the cap",
        "fingers holding the product loosely, mid-motion",
        "hand angled to show packaging texture and detail",
      ];
      const placedDetails = [
        "product resting naturally on the surface",
        "product placed casually as if just set down",
        "product propped upright leaning against a nearby prop",
        "product laid down flat with a soft natural shadow beneath it",
        "product tilted at an angle, partially leaning on a decorative object",
        "product standing upright showcasing its side profile",
        "product placed slightly off to one side, surrounded by styled props",
        "product held up in the air just above the surface, mid-placement",
      ];

      // Specific placement phrases for the expanded "Gaya Pegangan" options (table/chair/door/shelf/custom).
      const placementPhrases = {
        placedtable:
          "resting naturally on a table surface, with a soft natural shadow beneath it",
        placedchair:
          "placed on a chair seat, angled naturally as if just set down",
        placeddoor:
          "placed near a doorway or on a staircase step, positioned naturally within the space",
        placedshelf:
          "placed on a shelf, styled naturally among the surrounding space",
      };
      function getPlacementPhrase(s) {
        if (s.hold === "placedcustom") {
          const custom = document
            .getElementById("customPlacementInput")
            .value.trim();
          return custom || pick(placedDetails);
        }
        return placementPhrases[s.hold] || pick(placedDetails);
      }

      const textureDetails = [
        "visible natural skin texture on the hand",
        "subtle nail detail catching the light",
        "slightly soft focus on the fingertips for a candid feel",
        "realistic, unretouched skin tone and texture",
      ];
      const compositionDetails = [
        "product slightly off-center for a candid, unposed feel",
        "rule-of-thirds framing with soft negative space around the product",
        "centered composition with a softly blurred background",
        "asymmetrical framing that feels spontaneous, not staged",
      ];
      const moodWords = [
        "candid",
        "authentic",
        "unposed",
        "effortless",
        "relatable",
        "raw and real",
      ];

      const cameraGearPhrases = [
        "shot on a smartphone camera",
        "realistic phone photography look with slight natural grain",
        "captured mid-scroll, casual phone snapshot style",
        "shot on iPhone, natural phone camera colors",
      ];
      const cameraStylePhrases = {
        phone: "shot on a smartphone camera, realistic phone photography look",
        dslr: "shot on a DSLR camera with soft creamy bokeh background blur",
        film: "shot on film, vintage grain and warm film color tones",
        webcam: "shot on a laptop webcam, slightly grainy low-resolution look",
      };

      const visualStylePhrases = {
        lifestyle: "casual lifestyle product photography",
        flatlay: "flat lay product photography shot from directly above",
        studio: "clean studio product photography with controlled lighting",
        outdoor: "natural outdoor lifestyle photography",
        ugc: "authentic UGC-style content, looking like a real customer's own phone photo/video, slightly imperfect and unpolished, testimonial in feel rather than a professional ad",
      };

      const backgroundPhrases = {
        bedroom: "in a cozy bedroom with bedding visible in the background",
        carinterior:
          "inside a car, with the dashboard and seat softly blurred in the background",
        rug: "on a fluffy rug on the floor",
        vanity: "on a vanity table surrounded by makeup items, softly blurred",
        kitchen: "in a kitchen with the countertop visible in the background",
        office:
          "on an office desk with a laptop and stationery softly blurred in the background",
        cafe: "at a cafe table with a drink and soft background blur",
        livingroom:
          "in a living room with a sofa softly blurred in the background",
        bathroom:
          "on a bathroom counter with a mirror softly blurred in the background",
        outdoorbg:
          "outdoors with natural greenery softly blurred in the background",
      };

      const ambiencePhrases = {
        cozy: "cozy and warm atmosphere with soft golden tones",
        bright: "bright and airy atmosphere with clean white tones",
        moody: "moody, dim atmosphere with deep shadows",
        minimalist: "clean minimalist atmosphere with neutral tones",
        pastel: "soft pastel aesthetic with muted colors",
        luxury: "elegant, luxurious atmosphere with rich tones",
        rustic: "rustic, vintage-inspired atmosphere with warm nostalgic tones",
      };

      const doodlePhrases = {
        none: "",
        sticker:
          ", with a small cute sticker-style rating badge overlay in one corner",
        reviewstyle:
          ", styled like an authentic customer review screenshot with a subtle star rating overlay",
        hearts:
          ", with small hand-drawn hearts and stars doodles scattered near the product",
        cutechar:
          ", with a small cute cartoon character doodle peeking from the corner (an original, generic chibi-style design — not any copyrighted, licensed, or trademarked character such as Hello Kitty, My Melody, or similar franchise mascots)",
        kawaiiset:
          ", with cute doodle stickers of a baby chick, tulip flowers, hearts, ribbon bows, and sparkles scattered around the frame (all original, generic shapes — not any copyrighted or licensed characters or brand mascots)",
        confetti:
          ", with a playful confetti and sparkle burst doodle effect scattered around the product",
        washitape:
          ", styled with a polaroid-frame border and small washi-tape corner accents, scrapbook-style",
        handwritten:
          ', with a hand-drawn arrow and a short handwritten-style note pointing toward the product (e.g. "must try!")',
        ribbon:
          ", with a small decorative ribbon or bow doodle accent in one corner of the frame",
        "stars-sparkle":
          ", with small twinkling star and sparkle doodles scattered around the product",
        clouds:
          ", with cute doodle clouds floating in the corners of the frame",
        rainbow: ", with a soft pastel rainbow arc doodle in the background",
        "polaroid-clip":
          ", styled with a polaroid photo frame border and a small doodle clip/peg accent in one corner",
        "cloud-heart":
          ", with small heart-shaped balloon doodles floating gently near the product",
        stamp:
          ", styled with a decorative postage-stamp-style frame border around the image",
        "glitter-frame":
          ", with a sparkly glitter-doodle border frame around the edges of the image",
      };

      const propPhrases = {
        flowers: "fresh white roses or tulips nearby",
        candles: "lit candles",
        pearls: "a draped pearl necklace or bracelet nearby",
        vintagemirror: "an ornate vintage mirror in soft focus nearby",
        plush:
          "a cute plush toy (an original, generic teddy-bear-style design — not any copyrighted or licensed character)",
        skincareclutter: "skincare bottles and cosmetics clutter",
        fairylights: "warm fairy lights",
        bubbles: "soft glowing bubble light leaks",
      };

      const kawaiiAmbiencePhrase =
        "dreamy kawaii pastel aesthetic with soft pink and cream tones, a gentle glow, and a playful mobile-first promotional feel (using only original, generic cute design elements — avoid any copyrighted, licensed, or trademarked characters, mascots, or brand logos such as Sanrio characters, Hello Kitty, My Melody, or similar)";

      const outfitColors = {
        black: "black",
        white: "white",
        beige: "beige/nude",
        pink: "soft pastel pink",
        sage: "sage green",
        navy: "navy blue",
        red: "red",
        denim: "denim blue",
      };
      const outfitBaseTexts = {
        casual: "casual everyday top",
        knitwear: "long-sleeve knit sweater",
        formal: "smart formal/office wear",
        hoodie: "oversized hoodie",
        none: "an outfit that suits the scene naturally",
      };
      function getCustomOutfitText() {
        const custom = document
          .getElementById("customOutfitInput")
          .value.trim();
        return custom || "a custom outfit";
      }
      function getOutfitColorText(s) {
        if (s.outfitColor === "custom") {
          const custom = document
            .getElementById("customColorInput")
            .value.trim();
          return custom || "custom-colored";
        }
        return outfitColors[s.outfitColor];
      }
      const genderNoun = {
        woman: "a woman's hand",
        man: "a man's hand",
        mascot: "the mascot character's paw/hand",
      };
      const personNoun = {
        woman: "the woman",
        man: "the man",
        mascot: "the mascot character",
      };
      const skinTonePhrases = {
        fair: "fair skin tone",
        medium: "medium skin tone",
        tan: "tan skin tone",
        deep: "deep skin tone",
      };
      const ageRangePhrases = {
        young: "appearing to be in their early twenties",
        adult: "appearing to be in their thirties",
        mature: "appearing to be in their forties",
      };
      const accessoryPhrases = {
        ring: "wearing a delicate ring",
        bracelet: "wearing a thin bracelet",
        manicure: "with neatly manicured nails",
        watch: "wearing a stylish wristwatch",
        henna: "with intricate henna designs on the hand",
        "rings-stack": "wearing several stacked rings",
        bangle: "wearing a chunky bangle bracelet",
      };

      // ---------- PROMPT BUILDER ----------
      function buildSubjectClause(s, productName, descPart) {
        const isVideo = s.outputType === "video";
        const isMascot = s.model === "mascot";
        const skinPhrase =
          !isMascot && s.skintone !== "random"
            ? `, ${skinTonePhrases[s.skintone]}`
            : "";
        const selectedAccessories = getMultiValues("accessory");
        const accessoryPhrase =
          !isMascot && selectedAccessories.length
            ? `, ${selectedAccessories.map((a) => accessoryPhrases[a]).join(", ")}`
            : "";

        if (s.model === "none") {
          return `"${productName}"${descPart}, ${getPlacementPhrase(s)}`;
        }

        const outfitColorText = getOutfitColorText(s);
        const outfitPhrase = isMascot
          ? "with a cute, original mascot character design (not any copyrighted or licensed character such as Hello Kitty, My Melody, or similar franchise mascots)"
          : s.outfit === "custom"
            ? `wearing ${getCustomOutfitText()}`
            : s.outfit === "none"
              ? `wearing ${outfitBaseTexts.none}`
              : `wearing a ${outfitColorText} ${outfitBaseTexts[s.outfit]}`;
        const hijabPhrase =
          !isMascot && s.model === "woman" && s.hijab === "yes"
            ? ", wearing a hijab"
            : "";
        const agePhrase = isMascot ? "" : `, ${ageRangePhrases[s.agerange]}`;
        const gender = isVideo ? "a hand" : genderNoun[s.model];
        const personRef = isVideo ? "the person" : personNoun[s.model];

        if (s.povType === "selfie") {
          const selfieIntro = isVideo
            ? "front-facing camera view"
            : "front-camera selfie POV";
          return `${selfieIntro}, ${gender} extending the arm toward the camera holding "${productName}"${descPart}, ${outfitPhrase}${hijabPhrase}${agePhrase}${skinPhrase}, face softly visible and slightly out of focus in the background, mirror-selfie style${accessoryPhrase}`;
        }
        if (s.povType === "thirdperson") {
          return `${personRef} candidly interacting with "${productName}"${descPart}, ${outfitPhrase}${hijabPhrase}${agePhrase}${skinPhrase}, unaware of the camera, captured as if by a friend${accessoryPhrase}`;
        }
        if (s.povType === "headshot") {
          return `${personRef} shown from the shoulders up, face clearly visible with a natural, satisfied expression, ${outfitPhrase}${hijabPhrase}${agePhrase}${skinPhrase}, holding "${productName}"${descPart} up near chest height${accessoryPhrase}`;
        }
        if (s.povType === "fullbody") {
          return `${personRef} shown in a full-body shot from head to toe, ${outfitPhrase}${hijabPhrase}${agePhrase}${skinPhrase}, standing naturally while holding or showcasing "${productName}"${descPart}${accessoryPhrase}`;
        }
        if (s.povType === "mirror") {
          return `${personRef} shown in a full-body mirror selfie (OOTD-style), phone visible in hand reflected in the mirror, ${outfitPhrase}${hijabPhrase}${agePhrase}${skinPhrase}, showcasing "${productName}"${descPart} as part of the outfit${accessoryPhrase}`;
        }
        if (s.povType === "reaction") {
          return `extreme close-up on ${personRef}'s face, natural genuine reaction expression (pleasantly surprised or satisfied), ${outfitPhrase}${hijabPhrase}${agePhrase}${skinPhrase}, "${productName}"${descPart} held partially in frame near the face${accessoryPhrase}`;
        }
        if (s.povType === "overhead") {
          return `overhead POV looking straight down at ${gender}, ${outfitPhrase}${hijabPhrase}, holding "${productName}"${descPart} from directly above, ${pick(textureDetails)}${skinPhrase}${accessoryPhrase}`;
        }
        if (s.povType === "walkingindoor") {
          return `${personRef} candidly captured mid-stride while walking through an indoor space, ${outfitPhrase}${hijabPhrase}${agePhrase}${skinPhrase}, casually carrying or holding "${productName}"${descPart}, natural indoor motion blur in the background${accessoryPhrase}`;
        }
        if (s.povType === "walkingoutdoor") {
          return `${personRef} candidly captured mid-stride while walking outdoors, ${outfitPhrase}${hijabPhrase}${agePhrase}${skinPhrase}, casually carrying or holding "${productName}"${descPart}, natural outdoor motion blur in the background${accessoryPhrase}`;
        }
        if (s.povType === "car") {
          return `${personRef} seated inside a car, ${outfitPhrase}${hijabPhrase}${agePhrase}${skinPhrase}, holding "${productName}"${descPart} near the dashboard or window, soft natural light through the car window${accessoryPhrase}`;
        }
        if (s.povType === "gettingready") {
          return `${personRef} in front of a bathroom mirror during a getting-ready routine, ${outfitPhrase}${hijabPhrase}${agePhrase}${skinPhrase}, holding "${productName}"${descPart} as part of the routine, soft morning light${accessoryPhrase}`;
        }
        if (s.povType === "unboxing") {
          return `${gender} and a second hand together, ${outfitPhrase}${hijabPhrase}, both hands opening or unboxing "${productName}"${descPart}, excited and curious energy, ${pick(textureDetails)}${skinPhrase}${accessoryPhrase}`;
        }
        if (s.povType === "overshoulder") {
          const otsIntro = isVideo
            ? "angled shot from slightly behind the subject"
            : "over-the-shoulder view";
          return `${otsIntro} of ${personRef}, ${outfitPhrase}${hijabPhrase}${agePhrase}${skinPhrase}, shoulder and back of the head softly visible in frame, focus on the hands interacting with "${productName}"${descPart}${accessoryPhrase}`;
        }
        // default: hand-focused shot
        if (s.hold === "handheld") {
          return `${gender}, ${outfitPhrase}${hijabPhrase}, ${pick(handDetails)} while holding "${productName}"${descPart}, ${pick(textureDetails)}${skinPhrase}${accessoryPhrase}`;
        }
        return `${gender}, ${outfitPhrase}${hijabPhrase}, nearby while "${productName}"${descPart} is ${getPlacementPhrase(s)}`;
      }

      const videoDurations = ["3-second", "5-second", "6-second", "8-second"];
      const videoMotions = [
        "the hand slowly rotates the product to reveal the label",
        "the hand lifts the product up toward the camera and gently shakes it",
        "fingers twist open the cap in one smooth motion",
        "the hand swipes a small amount of the product onto the back of the wrist or hand",
        "the person casually turns the product from side to side while glancing at it",
        "the hand brings the product closer to the camera in a slow reveal",
      ];
      const cameraMovements = [
        "static handheld shot with subtle natural hand-shake",
        "slow, smooth push-in zoom",
        "gentle pan following the hand's movement",
        "slight tilt-up reveal from the product to the hand",
      ];

      function buildPersonaLine(s) {
        if (s.model === "none")
          return "no visible person; product-only composition";
        if (s.model === "mascot")
          return "an original, generic cute mascot character (not any copyrighted or licensed character)";
        const outfitColorText = getOutfitColorText(s);
        const outfitBase =
          s.outfit === "custom"
            ? getCustomOutfitText()
            : outfitBaseTexts[s.outfit];
        const agePart = ageRangePhrases[s.agerange];
        if (s.outputType === "video") {
          const hijabPart =
            s.model === "woman" && s.hijab === "yes" ? " wearing a hijab," : "";
          return `a person${hijabPart} wearing a soft ${outfitColorText} ${outfitBase}, ${agePart}, casual everyday look`;
        }
        const genderWord = s.model === "woman" ? "feminine" : "masculine";
        const hijabPart =
          s.model === "woman" && s.hijab === "yes"
            ? " muslimah wearing a hijab,"
            : "";
        return `${genderWord}${hijabPart} wearing a soft ${outfitColorText} ${outfitBase}, ${agePart}, casual everyday look`;
      }

      function buildActionDetail(s, productName, descPart) {
        const isVideo = s.outputType === "video";
        if (s.model === "none") {
          return `"${productName}"${descPart} viewed as the main focus of the shot, ${getPlacementPhrase(s)}`;
        }
        if (s.povType === "selfie") {
          const intro = isVideo
            ? "front-facing camera view"
            : "front-camera selfie POV";
          return `${intro}, arm extended toward the camera holding "${productName}"${descPart}, face softly visible and slightly out of focus in the background`;
        }
        if (s.povType === "thirdperson") {
          return `candidly interacting with "${productName}"${descPart}, unaware of the camera, captured as if by a friend`;
        }
        if (s.povType === "headshot") {
          return `shown from the shoulders up, face clearly visible with a natural, satisfied expression, holding "${productName}"${descPart} up near chest height`;
        }
        if (s.povType === "fullbody") {
          return `shown in a full-body shot from head to toe, standing naturally while holding or showcasing "${productName}"${descPart}`;
        }
        if (s.povType === "mirror") {
          return `shown in a full-body mirror selfie (OOTD-style), phone visible in hand reflected in the mirror, showcasing "${productName}"${descPart} as part of the outfit`;
        }
        if (s.povType === "reaction") {
          return `extreme close-up on the face, natural genuine reaction expression (pleasantly surprised or satisfied), "${productName}"${descPart} held partially in frame near the face`;
        }
        if (s.povType === "overhead") {
          return `overhead POV looking straight down at the hand holding "${productName}"${descPart} from directly above`;
        }
        if (s.povType === "walkingindoor") {
          return `candidly captured mid-stride while walking through an indoor space, casually carrying or holding "${productName}"${descPart}, natural indoor motion blur in the background`;
        }
        if (s.povType === "walkingoutdoor") {
          return `candidly captured mid-stride while walking outdoors, casually carrying or holding "${productName}"${descPart}, natural outdoor motion blur in the background`;
        }
        if (s.povType === "car") {
          return `seated inside a car, holding "${productName}"${descPart} near the dashboard or window, soft natural light through the car window`;
        }
        if (s.povType === "gettingready") {
          return `in front of a bathroom mirror during a getting-ready routine, holding "${productName}"${descPart} as part of the routine, soft morning light`;
        }
        if (s.povType === "unboxing") {
          return `both hands opening or unboxing "${productName}"${descPart} together, excited and curious energy`;
        }
        if (s.povType === "overshoulder") {
          const otsIntro = isVideo
            ? "angled shot from slightly behind the subject"
            : "over-the-shoulder view";
          return `${otsIntro}, shoulder and back of the head softly visible in frame, focus on the hands interacting with "${productName}"${descPart}`;
        }
        if (s.hold === "handheld") {
          return `${pick(handDetails)} while holding "${productName}"${descPart}, ${pick(textureDetails)}`;
        }
        return `"${productName}"${descPart} viewed from this angle as the main focus, ${getPlacementPhrase(s)}`;
      }

      function buildProductReferenceLine(s, productName, descPart) {
        const base = `"${productName}" from the uploaded reference image${descPart}`;
        if (s.keepProduct === "on") {
          return `${base}. Preserve the product exactly as shown in the reference — same shape, color, material, label, and design — keeping the same appearance throughout.`;
        }
        return `${base}.`;
      }

      const textBannerStylePhrases = {
        sticker:
          "cute bubble-font text banner overlay in a playful pastel color block",
        bold: "bold sans-serif banner text overlay, high-contrast and eye-catching",
        script:
          "elegant flowing script-font text overlay, sophisticated and delicate",
        handwritten:
          "doodle-style handwritten text overlay, casual and personal",
        neon: "glowing neon-style text overlay, vibrant and eye-catching",
        minimal: "small minimalist caption text overlay, clean and understated",
      };
      function getTextBannerStyleText(s) {
        if (s.textbannerStyle === "custom") {
          const custom = document
            .getElementById("customTextStyleInput")
            .value.trim();
          return custom || textBannerStylePhrases.sticker;
        }
        return (
          textBannerStylePhrases[s.textbannerStyle] ||
          textBannerStylePhrases.sticker
        );
      }

      function buildCore(s, forcedAngle, forcedFraming) {
        const productName =
          document.getElementById("productName").value.trim() || "the product";
        const productDesc = document.getElementById("productDesc").value.trim();
        const customBg = document.getElementById("customBg").value.trim();
        const descPart = productDesc ? ` (${productDesc})` : "";
        const isVideo = s.outputType === "video";

        const phraseMap = isVideo ? shotTypePhrasesVideoSafe : shotTypePhrases;
        const excludedForPov = povAngleExclude[s.povType] || [];
        const validAngleIds = Object.keys(shotTypePhrases).filter(
          (id) => !excludedForPov.includes(id),
        );
        const angleId =
          s.angle === "random" ? forcedAngle || pick(validAngleIds) : s.angle;
        const angleText = phraseMap[angleId] || phraseMap.eyelevel;
        const hasPerson = s.model !== "none";
        const framingPool = hasPerson
          ? framingOptionsWithPerson
          : framingOptions;
        // forcedFraming comes from storyboard cycling — remap it to a person-safe option when a person is in frame
        const framingPhrase = hasPerson
          ? forcedFraming && framingOptionsWithPerson.includes(forcedFraming)
            ? forcedFraming
            : pick(framingOptionsWithPerson)
          : forcedFraming || pick(framingOptions);
        const compositionDetail = pick(compositionDetails);
        const moodWord = pick(moodWords);
        const cameraGear =
          s.camerastyle === "random"
            ? pick(cameraGearPhrases)
            : cameraStylePhrases[s.camerastyle];
        const visualStylePhrase = visualStylePhrases[s.style];
        const subjectClause = buildSubjectClause(s, productName, descPart);
        const selectedDoodles = getMultiValues("doodle");
        const doodlePhrase = selectedDoodles.length
          ? selectedDoodles.map((d) => doodlePhrases[d]).join("")
          : s.kawaii === "on"
            ? doodlePhrases.kawaiiset
            : "";

        let backgroundSection,
          lightingPhrase,
          textBannerPart = "";
        const textStyleText = getTextBannerStyleText(s);

        if (s.keepBg === "on") {
          backgroundSection =
            "keeping the existing background from the uploaded reference photo completely unchanged and unaltered, do not generate, replace, or add a new background";
          lightingPhrase =
            "with lighting on the subject that matches and blends naturally with the original background photo";
        } else {
          const lightingKey = `${s.time}_${s.flash}`;
          lightingPhrase = pick(lightingPools[lightingKey]);
          const isOutdoor = s.style === "outdoor" || s.location === "outdoorbg";
          if (isOutdoor) {
            lightingPhrase += `, ${weatherPhrases[s.weather]}`;
          }

          const locationPhrase = customBg || backgroundPhrases[s.location];
          let ambiencePhrase = ambiencePhrases[s.ambience];
          if (s.kawaii === "on") {
            ambiencePhrase = kawaiiAmbiencePhrase;
          }

          // Props work independently of kawaii mode — usable with any aesthetic.
          let propsPart = "";
          const selectedProps = getMultiValues("props").map(
            (p) => propPhrases[p],
          );
          if (selectedProps.length) {
            propsPart = `, with ${selectedProps.join(", ")} softly blurred in the background`;
          }
          backgroundSection = `${locationPhrase}${propsPart}, ${ambiencePhrase}`;
        }

        // Text banner works independently of kawaii mode — usable with any aesthetic.
        if (s.textbanner === "on") {
          textBannerPart = `, with a ${textStyleText} displaying "${productName}"${s.kawaii === "on" ? ", styled like a mobile-first promotional graphic" : ""}`;
        }

        const activeCategory = getActiveCategory();
        const categoryHint = categoryPromptHints[activeCategory] || "";
        // If the user hasn't set a custom background and isn't keeping the original, let the category
        // steer the scene mood by appending its hint.
        if (categoryHint && s.keepBg !== "on" && !customBg) {
          backgroundSection = `${backgroundSection} — suited to the product category: ${categoryHint}`;
        }

        return {
          angleText,
          framingPhrase,
          compositionDetail,
          moodWord,
          cameraGear,
          visualStylePhrase,
          subjectClause,
          doodlePhrase,
          backgroundSection,
          lightingPhrase,
          textBannerPart,
          productName,
          categoryHint,
          activeCategory,
          platformPhrase: isVideo
            ? platformConfig[s.platform].phrase
            : platformConfig[s.platform].phraseImage,
          scenePhrase: getSelectedSceneText(),
          personaLine: buildPersonaLine(s),
          actionDetail: buildActionDetail(s, productName, descPart),
          productReferenceLine: buildProductReferenceLine(
            s,
            productName,
            descPart,
          ),
        };
      }

      function formatStructured(core, s) {
        const lines = [];
        lines.push(
          `[SHOT TYPE]: ${core.angleText}, ${core.framingPhrase}, ${s.outputType === "video" ? "video clip" : "photo"}, aspect ratio ${s.aspect}`,
        );
        lines.push(`[SUBJECT]: ${core.personaLine}`);
        lines.push(`[ACTION]: ${core.actionDetail}`);
        const styleBits = [
          core.visualStylePhrase,
          "ultra realistic 8k",
          `taken with a smartphone camera (${core.cameraGear})`,
          core.lightingPhrase,
        ];
        if (core.platformPhrase) styleBits.push(core.platformPhrase);
        lines.push(`[STYLE]: ${styleBits.join(", ")}`);
        let bg = core.backgroundSection;
        if (core.scenePhrase) bg += `; ${core.scenePhrase}`;
        lines.push(`[BACKGROUND]: ${bg}`);
        if (core.doodlePhrase)
          lines.push(`[DECOR]: ${core.doodlePhrase.replace(/^,\s*/, "")}`);
        if (core.textBannerPart)
          lines.push(
            `[TEXT OVERLAY]: ${core.textBannerPart.replace(/^,\s*/, "")}`,
          );
        lines.push(`[PRODUCT]: ${core.productReferenceLine}`);
        return lines.join("\n");
      }

      function formatImage(core, s) {
        const platformPart = core.platformPhrase
          ? `, ${core.platformPhrase}`
          : "";
        const scenePart = core.scenePhrase
          ? `. Scene: ${core.scenePhrase}`
          : "";
        return `${core.angleText}, ${core.framingPhrase}, ${core.visualStylePhrase} of ${core.subjectClause}, ${core.backgroundSection}, ${core.lightingPhrase}, ${core.compositionDetail}, ${core.moodWord} affiliate marketing photo${core.doodlePhrase}${core.textBannerPart}, ${core.cameraGear}, photorealistic, highly detailed${platformPart}${scenePart}. Aspect ratio ${s.aspect}.`;
      }

      function formatVideo(core, s) {
        const duration = pick(videoDurations);
        const cameraMovement = pick(cameraMovements);
        const motion = core.scenePhrase || pick(videoMotions);
        const platformPart = core.platformPhrase
          ? `, ${core.platformPhrase}`
          : "";
        return `${duration} video clip, ${cameraMovement}, ${core.framingPhrase}, ${core.visualStylePhrase} of ${core.subjectClause}, ${core.backgroundSection}, ${core.lightingPhrase}. Action: ${motion}. ${core.moodWord} lifestyle product video${core.doodlePhrase}${core.textBannerPart}, ${core.cameraGear}, smooth realistic motion and physics${platformPart}, vertical video format, aspect ratio ${s.aspect}.`;
      }

      function buildOnePrompt(s) {
        const core = buildCore(s);
        if (s.promptFormat === "structured") return formatStructured(core, s);
        return s.outputType === "video"
          ? formatVideo(core, s)
          : formatImage(core, s);
      }

      function getSceneRoles(n) {
        if (n <= 1) return ["hook"];
        if (n === 2) return ["hook", "result"];
        return ["hook", ...Array(n - 2).fill("demo"), "result"];
      }

      const roleLabels = {
        hook: "HOOK — Buka Perhatian",
        demo: "DEMO — Guna Produk",
        result: "RESULT — Hasil & CTA",
      };
      const roleAdditions = {
        hook: "this is the opening shot, designed to immediately grab attention",
        demo: "this is a product demo shot, showing the item being used, examined, or applied closely",
        result:
          "this is the closing shot, showing the satisfying result with a positive, happy feel",
      };
      const roleTitleBank = {
        hook: ["DAWN INTRO", "OPENING SHOT", "FIRST IMPRESSION"],
        demo: [
          "PRODUCT DETAIL",
          "CLOSE-UP DETAIL",
          "IN USE",
          "TEXTURAL MOMENT",
          "HAND CLOSE-UP",
        ],
        result: ["FINAL FRAME", "CLOSING SHOT", "BRAND SIGN-OFF"],
      };
      const roleDisplayDescriptions = {
        hook: "Eye-catching opening shot designed to immediately grab attention.",
        demo: "Product demo shot showing the item being used, examined, or applied closely.",
        result:
          "Closing shot showing the satisfying result, with a positive final impression.",
      };

      // Short human-readable labels for each shot-type id, used in the CAMERA: field of storyboard breakdowns.
      const shotTypeShortLabels = {
        macro: "Macro",
        closeup: "Close Up",
        whippan: "Whip Pan",
        ecu: "Extreme Close-Up",
        mediumshot: "Medium Shot",
        fullwide: "Wide Shot",
        ews: "Extreme Wide Shot",
        eyelevel: "Eye-Level",
        lowangle: "Low Angle",
        highangle: "High Angle",
        topdown: "Top-Down/Flat Lay",
        dutch: "Dutch Angle",
        orbit: "360° Orbit",
        pushin: "Push-In",
        pullout: "Pull-Out",
        pantilt: "Pan & Tilt",
        tracking: "Tracking Shot",
        crane: "Crane/Jib",
        ots: "Over-the-Shoulder",
        povshot: "POV",
        macroaction: "Macro Action",
      };

      const captionLanguagePhrases = {
        auto: "Malay or English, whichever suits the product",
        ms: "Bahasa Melayu",
        en: "English",
      };
      function getCaptionLanguageText(s) {
        return (
          captionLanguagePhrases[s.captionLanguage] ||
          captionLanguagePhrases.auto
        );
      }

      // Generic Malay marketing tagline pool for burned-in storyboard captions (title + subtext).
      const malayTaglines = [
        { t: "GAYA KLASIK, SELESA HARI-HARI.", s: "Sesuai untuk semua acara." },
        { t: "KUALITI PREMIUM.", s: "Tahan lama, tak mudah rosak." },
        { t: "RINGAN DAN SELESA.", s: "Teman setiap hari anda." },
        { t: "PADAN DENGAN SEGALANYA.", s: "Gaya santai, tetap standout." },
        { t: "BERGAYA DI SETIAP MASA.", s: "Tampil yakin, setiap masa." },
        { t: "UNTUK AKTIVITI SEHARIAN.", s: "Dari pagi hingga malam." },
        { t: "DETAIL YANG MENARIK.", s: "Rekaan kemas, ikonik." },
        { t: "SELESA SEPANJANG HARI.", s: "Tiada lagi kompromi." },
        { t: "PILIHAN TERBAIK ANDA.", s: "Kualiti. Gaya. Keselesaan." },
        { t: "MILIKI SEKARANG.", s: "Gaya anda, identiti anda." },
      ];
      function pickTagline() {
        return pick(malayTaglines);
      }

      function deriveShotPurpose(angleId, hasModel) {
        if (["macro", "closeup", "ecu", "macroaction"].includes(angleId))
          return "Detail";
        if (!hasModel) return "Produk Hero";
        return pick(["Lifestyle", "Lifestyle Detail", "Lifestyle Wide"]);
      }

      const actionLabelPools = {
        hand: ["Pegang produk", "Tunjuk produk"],
        selfie: ["Pegang dekat muka", "Selfie dengan produk"],
        thirdperson: ["Guna produk", "Berinteraksi dengan produk"],
        headshot: ["Tunjuk sambil senyum", "Pegang dekat dada"],
        fullbody: ["Berdiri sambil pegang", "Tunjuk gaya penuh"],
        mirror: ["OOTD depan cermin", "Tunjuk gaya cermin"],
        reaction: ["Reaksi wajah", "Ekspresi puas"],
        overhead: ["Pegang dari atas", "Tunjuk dari atas"],
        walking: ["Berjalan santai", "Melangkah"],
        car: ["Duduk dalam kereta", "Pegang dalam kereta"],
        gettingready: ["Routine pagi", "Bersedia depan cermin"],
        unboxing: ["Buka kotak", "Unbox produk"],
        overshoulder: ["Guna produk dari belakang bahu", "Tunjuk aksi dari belakang"],
      };
      function deriveActionLabel(s) {
        if (s.model === "none")
          return pick(["Produk statik", "Susun produk", "Letak di permukaan"]);
        const pool = actionLabelPools[s.povType] || actionLabelPools.hand;
        return pick(pool);
      }

      function formatTimecode(totalSeconds) {
        const m = Math.floor(totalSeconds / 60);
        const sec = totalSeconds % 60;
        return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
      }

      function panelNumberPhrase(s, n) {
        return s.panelNumber === "on"
          ? ` With a small numbered badge "${n})" displayed in a plain circle at the top-left corner of the frame, matching a numbered product showcase grid style.`
          : "";
      }

      // Coherent, sequential camera-movement chains for a single continuous video (avoids the
      // "contradictory camera movement" moderation flag caused by stacking unrelated angles/movements).
      const sequentialMovementSets = [
        [
          "an overhead shot of the product resting naturally on the surface",
          "a slow cinematic push-in toward the product",
          "a gentle orbiting movement around the product",
          "a macro close-up highlighting the design and material details",
        ],
        [
          "a static establishing shot of the product on the surface",
          "a smooth pan across the product",
          "a slow zoom into the product's key design detail",
          "a soft pull-back revealing the full styled scene",
        ],
        [
          "a top-down flat-lay view of the product",
          "a gentle tilt down toward the product",
          "a slow push-in on the product's texture",
          "a subtle orbit around the product to reveal its side profile",
        ],
      ];

      function buildContinuousVideoPrompt(s, beatCount) {
        const productName =
          document.getElementById("productName").value.trim() || "the product";
        const productDesc = document.getElementById("productDesc").value.trim();
        const descPart = productDesc ? ` (${productDesc})` : "";
        const core = buildCore(s);

        const secondsPerBeat = 3;
        const totalSeconds = beatCount * secondsPerBeat;

        const handAction =
          s.model !== "none"
            ? " Partway through, a hand naturally enters the frame, gently lifts the product, slowly rotates it to reveal its design, then places it back down."
            : "";

        if (s.basedOnSheet === "on") {
          const dollySteps = [];
          for (let i = 0; i < beatCount; i++) {
            dollySteps.push(`panel ${i + 1}`);
          }
          return `${totalSeconds}-second vertical ${s.aspect} ultra-realistic lifestyle product video. Using the uploaded storyboard/reference sheet as the visual guide, create a smooth continuous dolly-style camera movement that travels through the sheet in sequence — starting at ${dollySteps[0]} and moving smoothly through ${dollySteps.slice(1).join(", ")}, treating each panel as a moment within one continuous take rather than separate cuts.${handAction} Maintain the exact product design, colors, and details shown in the uploaded sheet throughout — ${core.productReferenceLine} Keep lighting and color tone consistent across the whole movement, with smooth, realistic camera motion and a calm, aesthetic product-video feel.`;
        }

        const movementSet = pick(sequentialMovementSets);
        const movements = [];
        for (let i = 0; i < beatCount; i++) {
          movements.push(movementSet[i % movementSet.length]);
        }
        const movementText = movements.join(", then ");

        return `${totalSeconds}-second vertical ${s.aspect} ultra-realistic lifestyle product video. Begin with ${movementText}.${handAction} The scene takes place ${core.backgroundSection}, with ${core.lightingPhrase}. ${core.productReferenceLine} Maintain smooth, realistic camera movement and natural lighting throughout, with a calm, aesthetic product-video feel.`;
      }

      const artStylePhrases = {
        photoreal:
          "photorealistic, highly detailed, professional product photography quality",
        pencil:
          "hand-drawn colored pencil sketch illustration style, soft cross-hatching texture and visible pencil strokes, warm storybook illustration aesthetic",
        watercolor:
          "soft watercolor illustration style, gentle color bleeds and delicate brush textures, artistic and painterly",
        vector:
          "clean flat vector illustration style, bold simple outlines, minimal flat shading, modern graphic design look",
        render3d:
          "3D rendered clay-style illustration, soft rounded shapes, pastel toy-like render, playful dimensional look",
        lineart:
          "minimalist black-and-white line art sketch, simple clean linework, no color, elegant and sparse",
        comic:
          "comic book / manga illustration style, bold ink outlines, halftone dot shading, dynamic graphic look",
      };

      function buildSheetPrompt(s, panelCount) {
        const productName =
          document.getElementById("productName").value.trim() || "the product";
        const productDesc = document.getElementById("productDesc").value.trim();
        const descPart = productDesc ? ` (${productDesc})` : "";

        // Grid math (shared by both paths): prefer an exact factor pair with a reasonable shape;
        // otherwise use a square-ish layout and instruct the AI to leave extra cells empty.
        let cols = Math.ceil(Math.sqrt(panelCount));
        let rows = Math.ceil(panelCount / cols);
        for (
          let c = Math.ceil(Math.sqrt(panelCount));
          c <= Math.min(panelCount, Math.ceil(Math.sqrt(panelCount)) + 2);
          c++
        ) {
          if (panelCount % c === 0 && panelCount / c >= 2) {
            cols = c;
            rows = panelCount / c;
            break;
          }
        }
        const totalDuration = getStoryboardDuration();
        const durations = distributeDurations(totalDuration, panelCount);
        const angleCycle = shuffleArray(
          Object.keys(shotTypePhrases).filter(
            (id) => !(povAngleExclude[s.povType] || []).includes(id),
          ),
        );
        const lightingCycle = shuffleArray(socialLightingPool);
        const audioCycle = shuffleArray(socialAudioPool);
        const artStyleText =
          artStylePhrases[s.artStyle] || artStylePhrases.photoreal;
        const captionRule =
          s.autoCaption === "off"
            ? "Do not add any headline captions."
            : `For every headline caption, YOU (the AI) must write a short, relevant line that genuinely matches this exact product, its category, and the scene shown — never generic placeholder text. Write captions in ${getCaptionLanguageText(s)}.`;

        // ---- Based on an already-generated image: skip all visual-settings generation ----
        if (s.storyboardFromExisting === "on") {
          const panelLinesExisting = [];
          for (let i = 0; i < panelCount; i++) {
            const forcedAngle = angleCycle[i % angleCycle.length];
            const cameraLabel = shotTypeShortLabels[forcedAngle] || "Eye-Level";
            const actionLabel = deriveActionLabel(s);
            const lighting = lightingCycle[i % lightingCycle.length];
            const audio = audioCycle[i % audioCycle.length];
            const numberBadge =
              s.panelNumber === "on"
                ? `Numbered badge "${String(i + 1).padStart(2, "0")}" in a colored rounded-square top-left corner. `
                : "";
            const captionPart =
              s.autoCaption === "off"
                ? ""
                : `A short bold headline caption (auto-written by you to genuinely fit this specific product and scene — do NOT use generic filler) burned into the image, with a small supporting subtext line below it. `;
            panelLinesExisting.push(
              `Panel ${i + 1}: ${numberBadge}${captionPart}Small metadata labels burned into the lower-left corner reading "ACTION: ${actionLabel}", "CAMERA: ${cameraLabel}", "LIGHTING: ${lighting}", "AUDIO: ${audio}", "DURATION: ${durations[i]}s". Camera direction: ${shotTypePhrases[forcedAngle]}.`,
            );
          }
          return `Using the uploaded product image as the exact visual reference — do NOT regenerate the pose, outfit, model, or background; keep the subject and setting exactly as shown in the uploaded image in every panel. Create a single storyboard sheet image containing EXACTLY ${panelCount} panels arranged in a clean ${cols}x${rows} grid (if the grid has more cells than ${panelCount}, leave the extra cells empty — do not add extra panels), styled like a professional shot-list-annotated ad storyboard.\n\n${panelLinesExisting.join("\n")}\n\n${captionRule}\n\nOnly the camera angle/framing and burned-in text/metadata should differ between panels — the subject, outfit, pose, and background must remain identical to the uploaded image throughout. Art style: ${artStyleText}, consistent across every panel. Total video duration ${totalDuration}s across ${panelCount} scenes. Overall grid image aspect ratio ${s.aspect}.`;
        }

        const framingCycle = shuffleArray(
          s.model !== "none" ? framingOptionsWithPerson : framingOptions,
        );

        const panelLines = [];
        let sharedCore = null;
        for (let i = 0; i < panelCount; i++) {
          const forcedAngle = angleCycle[i % angleCycle.length];
          const forcedFraming = framingCycle[i % framingCycle.length];
          const core = buildCore(s, forcedAngle, forcedFraming);
          if (!sharedCore) sharedCore = core;
          const action = buildActionDetail(s, productName, descPart);
          const cameraLabel = shotTypeShortLabels[forcedAngle] || "Eye-Level";
          const actionLabel = deriveActionLabel(s);
          const lighting = lightingCycle[i % lightingCycle.length];
          const audio = audioCycle[i % audioCycle.length];
          const numberBadge =
            s.panelNumber === "on"
              ? `Numbered badge "${String(i + 1).padStart(2, "0")}" in a colored rounded-square top-left corner. `
              : "";
          const captionPart =
            s.autoCaption === "off"
              ? ""
              : `A short bold headline caption (auto-written by you to genuinely fit this specific product and scene — do NOT use generic filler) burned into the image, with a small supporting subtext line below it. `;
          panelLines.push(
            `Panel ${i + 1}: ${numberBadge}${captionPart}Small metadata labels burned into the lower-left corner reading "ACTION: ${actionLabel}", "CAMERA: ${cameraLabel}", "LIGHTING: ${lighting}", "AUDIO: ${audio}", "DURATION: ${durations[i]}s". Visual: ${core.angleText}, ${core.framingPhrase}, showing ${action}.`,
          );
        }

        return `Create a single storyboard sheet image containing EXACTLY ${panelCount} panels arranged in a clean ${cols}x${rows} grid (if the grid has more cells than ${panelCount}, leave the extra cells empty — do not add extra panels), all featuring "${productName}"${descPart} in different framings within one cohesive sheet — styled like a professional shot-list-annotated ad storyboard. Each panel shows its own headline caption plus ACTION / CAMERA / LIGHTING / AUDIO / DURATION metadata burned directly into the image.\n\n${panelLines.join("\n")}\n\n${captionRule}\n\nAll panels share the same ${sharedCore.backgroundSection}, ${sharedCore.lightingPhrase}, and ${sharedCore.visualStylePhrase} for a consistent, cohesive sheet. ${sharedCore.productReferenceLine} Art style: ${artStyleText}, consistent across every panel. Total video duration ${totalDuration}s across ${panelCount} scenes. Overall grid image aspect ratio ${s.aspect}.`;
      }

      // ---------- UGC ADS MODE (fixed 6-scene: Hook > Intro > Feature > Demo > Lifestyle > CTA) ----------
      const ugcRoles = ["hook", "intro", "feature", "demo", "lifestyle", "cta"];
      const ugcRoleLabels = {
        hook: "HOOK",
        intro: "PRODUCT INTRO",
        feature: "KEY FEATURE",
        demo: "DEMONSTRATION",
        lifestyle: "LIFESTYLE",
        cta: "CTA",
      };
      const ugcRoleDescriptions = {
        hook: "an attention-grabbing opening moment designed to immediately stop the scroll in the first second",
        intro:
          "a clear introduction of the product, showing it plainly to the camera",
        feature:
          "a close-up highlighting one key feature or benefit of the product",
        demo: "demonstrating the product being used in action",
        lifestyle:
          "the product fitting naturally into an everyday lifestyle moment",
        cta: "a closing call-to-action moment inviting the viewer to check out or order the product",
      };
      const ugcCaptions = {
        hook: [
          "Korang kena tengok ni!",
          "Wah, mesti nak tahu ni!",
          "Stop scroll — tengok ni dulu!",
          "Ni yang korang cari-cari!",
        ],
        intro: [
          "Kenalkan {p}",
          "Ni dia {p}",
          "Cuba tengok {p} ni",
          "Meet {p}!",
        ],
        feature: [
          "Ciri utama dia power gila",
          "Yang ni paling best",
          "Kelebihan yang wajib tahu",
          "Ni yang buat dia special",
        ],
        demo: [
          "Cara guna senang je",
          "Tengok cara pakai dia",
          "Simple je nak guna",
          "Ni cara guna yang betul",
        ],
        lifestyle: [
          "Sesuai untuk daily use",
          "Padan dengan gaya harian",
          "Boleh bawa ke mana-mana",
          "Jadi part of my daily routine",
        ],
        cta: [
          "Order sekarang sebelum habis!",
          "Grab yours now!",
          "Klik link untuk order!",
          "Dapatkan sekarang, jangan tunggu!",
        ],
      };
      function pickUgcCaption(role, productName) {
        return pick(ugcCaptions[role]).replace("{p}", productName);
      }

      function scaleUgcRoles(n) {
        if (n === ugcRoles.length) return [...ugcRoles];
        if (n < ugcRoles.length) {
          const result = [ugcRoles[0]];
          const middle = ugcRoles.slice(1, -1);
          const midCount = n - 2;
          for (let i = 0; i < midCount; i++) {
            result.push(
              middle[
                Math.round(
                  (i * (middle.length - 1)) / Math.max(1, midCount - 1),
                )
              ],
            );
          }
          result.push(ugcRoles[ugcRoles.length - 1]);
          return result;
        }
        const result = [ugcRoles[0]];
        const middle = ugcRoles.slice(1, -1);
        const extra = n - 2;
        for (let i = 0; i < extra; i++) {
          result.push(middle[i % middle.length]);
        }
        result.push(ugcRoles[ugcRoles.length - 1]);
        return result;
      }

      function buildUgcSheetPrompt(s, sceneCount) {
        const productName =
          document.getElementById("productName").value.trim() || "the product";
        const productDesc = document.getElementById("productDesc").value.trim();
        const descPart = productDesc ? ` (${productDesc})` : "";
        const angleCycle = shuffleArray(
          Object.keys(shotTypePhrases).filter(
            (id) => !(povAngleExclude[s.povType] || []).includes(id),
          ),
        );
        const count = sceneCount || 6;
        const roles = scaleUgcRoles(count);
        const totalDuration = getStoryboardDuration();
        const durations = distributeDurations(totalDuration, count);
        const lightingCycle = shuffleArray(socialLightingPool);
        const audioCycle = shuffleArray(socialAudioPool);
        const artStyleText =
          artStylePhrases[s.artStyle] || artStylePhrases.photoreal;

        // grid math: prefer an exact factor pair with a reasonable shape; else square-ish with empty cells
        let cols = Math.ceil(Math.sqrt(count));
        let rows = Math.ceil(count / cols);
        for (
          let c = Math.ceil(Math.sqrt(count));
          c <= Math.min(count, Math.ceil(Math.sqrt(count)) + 2);
          c++
        ) {
          if (count % c === 0 && count / c >= 2) {
            cols = c;
            rows = count / c;
            break;
          }
        }

        // ---- Based on an already-generated image: skip all visual-settings generation ----
        if (s.storyboardFromExisting === "on") {
          const panelLinesExisting = roles.map((role, i) => {
            const forcedAngle = angleCycle[i % angleCycle.length];
            const cameraLabel = shotTypeShortLabels[forcedAngle] || "Eye-Level";
            const lighting = lightingCycle[i % lightingCycle.length];
            const audio = audioCycle[i % audioCycle.length];
            const numberBadge =
              s.panelNumber === "on"
                ? `Numbered badge "${String(i + 1).padStart(2, "0")}" in a colored rounded-square top-left corner. `
                : "";
            return `Panel ${i + 1} (${ugcRoleLabels[role]}): ${numberBadge}Camera direction: ${shotTypePhrases[forcedAngle]}. A short punchy caption (AI to auto-write, genuinely fitting this product & the ${ugcRoleLabels[role]} beat — ${getCaptionLanguageText(s)}, not generic filler) burned into the image. Small metadata labels burned into the lower-left corner reading "ACTION: ${ugcRoleLabels[role]}", "CAMERA: ${cameraLabel}", "LIGHTING: ${lighting}", "AUDIO: ${audio}", "DURATION: ${durations[i]}s".`;
          });
          return `Using the uploaded product image as the exact visual reference — do NOT regenerate the pose, outfit, model, or background; keep the subject and setting exactly as shown in the uploaded image in every panel. Create a single UGC storyboard sheet image containing EXACTLY ${count} panels arranged in a clean ${cols}x${rows} grid (leave any extra grid cells empty — do not add extra panels), styled like a professional shot-list-annotated ad storyboard. Total video duration ${totalDuration}s across ${count} scenes.\n\n${panelLinesExisting.join("\n")}\n\nFor every caption, YOU (the AI) must write a short line that genuinely matches this exact product and the scene's role — never generic placeholder text. Only the camera angle/framing and burned-in text/metadata should differ between panels — the subject, outfit, pose, and background must remain identical to the uploaded image throughout. Art style: ${artStyleText}, consistent across every panel. Overall grid image aspect ratio ${s.aspect}.`;
        }

        const framingCycle = shuffleArray(
          s.model !== "none" ? framingOptionsWithPerson : framingOptions,
        );
        let sharedCore = null;
        const panelLines = roles.map((role, i) => {
          const forcedAngle = angleCycle[i % angleCycle.length];
          const forcedFraming = framingCycle[i % framingCycle.length];
          const core = buildCore(s, forcedAngle, forcedFraming);
          if (!sharedCore) sharedCore = core;
          const action = buildActionDetail(s, productName, descPart);
          const cameraLabel = shotTypeShortLabels[forcedAngle] || "Eye-Level";
          const lighting = lightingCycle[i % lightingCycle.length];
          const audio = audioCycle[i % audioCycle.length];
          const numberBadge =
            s.panelNumber === "on"
              ? `Numbered badge "${String(i + 1).padStart(2, "0")}" in a colored rounded-square top-left corner. `
              : "";
          return `Panel ${i + 1} (${ugcRoleLabels[role]}): ${numberBadge}${core.angleText}, ${core.framingPhrase}, showing ${action}. A short punchy caption (AI to auto-write, genuinely fitting this product & the ${ugcRoleLabels[role]} beat — ${getCaptionLanguageText(s)}, not generic filler) burned into the image. Small metadata labels burned into the lower-left corner reading "ACTION: ${ugcRoleLabels[role]}", "CAMERA: ${cameraLabel}", "LIGHTING: ${lighting}", "AUDIO: ${audio}", "DURATION: ${durations[i]}s".`;
        });

        return `Create a single UGC storyboard sheet image containing EXACTLY ${count} panels arranged in a clean ${cols}x${rows} grid (leave any extra grid cells empty — do not add extra panels), all featuring "${productName}"${descPart} — the exact same product as the uploaded reference image, 100% consistent across every panel — styled like a professional shot-list-annotated ad storyboard. Total video duration ${totalDuration}s across ${count} scenes.\n\n${panelLines.join("\n")}\n\nFor every caption, YOU (the AI) must write a short line that genuinely matches this exact product and the scene's role — never generic placeholder text. All caption text and metadata labels are burned directly into the image itself (not a separate overlay layer), styled in a bold, clearly readable font with good contrast. All panels share the same ${sharedCore.backgroundSection}, ${sharedCore.lightingPhrase}, and ${sharedCore.visualStylePhrase} for a cohesive sheet. ${sharedCore.productReferenceLine} Art style: ${artStyleText}, consistent across every panel. Overall grid image aspect ratio ${s.aspect}.`;
      }

      function generateUgcFrames(s, sceneCount) {
        return [
          {
            label: "UGC STORYBOARD SHEET",
            text: buildUgcSheetPrompt(s, sceneCount),
          },
        ];
      }

      // ---------- SOCIAL STUDIO MODE (premium branded storyboard, based on user-provided master spec) ----------
      const socialSceneStructures = {
        tiktok: [
          "Hook",
          "Curiosity",
          "Reveal",
          "Interaction",
          "Benefit",
          "Lifestyle",
          "Satisfaction",
          "Ending",
        ],
        igreels: [
          "Beauty Shot",
          "Daily Use",
          "Detail",
          "Interaction",
          "Lifestyle",
          "Emotion",
          "Hero Product",
          "Ending",
        ],
        minicommercial: [
          "Hero",
          "Product",
          "Feature",
          "Usage",
          "Benefit",
          "Emotion",
          "Closing",
          "Logo/Product",
        ],
        lifestyleugc: [
          "Morning",
          "Preparation",
          "Product Use",
          "Lifestyle",
          "Routine",
          "Detail",
          "Satisfaction",
          "Ending",
        ],
        giftrec: [
          "Gift Box",
          "Unwrap",
          "Product Reveal",
          "Detail",
          "Recipient Reaction",
          "Lifestyle",
          "Premium Shot",
          "Ending",
        ],
      };
      const socialModeBadgeLabels = {
        tiktok: "TIKTOK VIRAL",
        igreels: "INSTAGRAM REELS",
        minicommercial: "MINI COMMERCIAL",
        lifestyleugc: "LIFESTYLE UGC",
        giftrec: "GIFT RECOMMENDATION",
      };
      const socialSoundEngine = {
        tiktok:
          "Voice Over = YES, Music = Trending Style, Natural Sound = Medium",
        igreels: "Voice Over = Optional, Music = Chill / Aesthetic",
        minicommercial: "Voice Over = YES, Music = Cinematic Light",
        lifestyleugc: "Voice Over = YES, Ambient = High",
        giftrec: "Voice Over = YES, Music = Warm & Emotional",
      };
      const socialLightingPool = [
        "Natural Window Light",
        "Soft Indoor Light",
        "Golden Hour",
        "Lifestyle Home Lighting",
        "Coffee Shop Ambient Light",
        "Workspace Lighting",
        "Minimal Studio Lighting",
      ];
      const socialCameraPool = [
        "POV",
        "Close Up",
        "Macro",
        "Top Down",
        "Handheld",
        "Walking Shot",
        "Orbit",
        "Push In",
        "Pull Out",
        "Quick Cut",
      ];
      const socialAudioPool = [
        "Soft music begins",
        "Natural sound rises",
        "Ambient + music",
        "Click/tap sound",
        "Music rise",
        "Satisfying interaction sound",
        "Warm ambient tone",
        "Music ends softly",
      ];
      const socialActionByLabel = {
        Hook: "unexpected close-up reveal of the product",
        Curiosity: "a partial glimpse building intrigue",
        Reveal: "the full product reveal moment",
        Interaction: "hands interacting naturally with the product",
        Benefit: "highlighting the key benefit in use",
        Lifestyle: "the product fitting into an everyday lifestyle moment",
        Satisfaction: "a satisfying result or reaction moment",
        Ending: "a final branded moment with the product",
        "Beauty Shot": "an elegant beauty-style product shot",
        "Daily Use": "the product being used in a daily routine",
        Detail: "a close-up on a specific product detail",
        Emotion: "a genuine emotional reaction moment",
        "Hero Product": "a hero shot of the product standing out",
        Hero: "a bold hero introduction of the product",
        Product: "a clear product introduction shot",
        Feature: "highlighting one standout feature",
        Usage: "demonstrating the product in use",
        Closing: "a closing branded moment",
        "Logo/Product": "a final logo and product lockup shot",
        Morning: "a morning routine moment",
        Preparation: "a getting-ready / preparation moment",
        "Product Use": "the product being actively used",
        Routine: "the product as part of a daily routine",
        "Gift Box": "an elegant gift box presentation",
        Unwrap: "the unwrapping / unboxing moment",
        "Product Reveal": "the product revealed from its packaging",
        "Recipient Reaction": "the recipient reacting warmly to the gift",
        "Premium Shot": "a premium, polished hero shot of the product",
      };

      function resolveSocialMode(s) {
        if (s.socialMode !== "auto") return s.socialMode;
        const text = (
          document.getElementById("productName").value +
          " " +
          document.getElementById("productDesc").value
        ).toLowerCase();
        if (["gift", "hadiah", "present"].some((k) => text.includes(k)))
          return "giftrec";

        // use detected category to pick the most fitting social sub-mode
        const cat = getActiveCategory();
        if (
          [
            "Kecantikan & Skincare",
            "Kosmetik & Mekap",
            "Penjagaan Diri & Mandian",
          ].includes(cat)
        )
          return "lifestyleugc";
        if (
          [
            "Minyak Wangi & Aromaterapi",
            "Aksesori Diri & Barang Kemas",
          ].includes(cat)
        )
          return "giftrec";
        if (
          [
            "Gajet & Peranti Pintar",
            "Audio & Fotografi",
            "Gaming & Konsol",
          ].includes(cat)
        )
          return "minicommercial";
        if (
          [
            "Pakaian & Fesyen Moden",
            "Pakaian Tradisional & Hijab",
            "Beg & Aksesori Simpanan",
            "Kasut & Stoking",
          ].includes(cat)
        )
          return "igreels";
        return "tiktok";
      }

      function distributeSocialDurations(totalSeconds, count) {
        const base = Math.floor((totalSeconds / count) * 10) / 10;
        const durations = Array(count).fill(base);
        let remainder = Math.round((totalSeconds - base * count) * 10) / 10;
        let i = 2;
        while (remainder > 0 && i < count) {
          durations[i] = Math.round((durations[i] + 0.2) * 10) / 10;
          remainder = Math.round((remainder - 0.2) * 10) / 10;
          i += 2;
        }
        return durations;
      }

      function resizeSceneLabels(labels, n) {
        if (n <= 1) return [labels[0]];
        if (n === labels.length) return labels;
        if (n < labels.length) {
          const result = [labels[0]];
          const middlePool = labels.slice(1, -1);
          const middleCount = n - 2;
          for (let i = 0; i < middleCount; i++) {
            const idx = Math.round(
              ((i + 1) * (middlePool.length - 1)) / (middleCount + 1),
            );
            result.push(middlePool[idx]);
          }
          result.push(labels[labels.length - 1]);
          return result;
        }
        // n > original length: repeat middle labels to fill, keep first/last fixed
        const result = [labels[0]];
        const middlePool = labels.slice(1, -1);
        const extra = n - 2;
        for (let i = 0; i < extra; i++) {
          result.push(middlePool[i % middlePool.length]);
        }
        result.push(labels[labels.length - 1]);
        return result;
      }

      function buildSocialStudioPrompt(s, sceneCount) {
        const productName =
          document.getElementById("productName").value.trim() || "the product";
        const productDesc = document.getElementById("productDesc").value.trim();
        const brandName = document
          .getElementById("brandNameInput")
          .value.trim();
        const totalDuration = getStoryboardDuration();
        const mode = resolveSocialMode(s);
        const labels = resizeSceneLabels(
          socialSceneStructures[mode],
          sceneCount || 8,
        );
        const durations = distributeSocialDurations(
          totalDuration,
          labels.length,
        );
        const cameraCycle = shuffleArray(socialCameraPool);
        const lightingCycle = shuffleArray(socialLightingPool);
        const audioCycle = shuffleArray(socialAudioPool);

        const isFacialCategory =
          /skincare|makeup|serum|cream|lipstick|mascara|facial/i.test(
            productDesc + " " + productName,
          );
        const facelessRule =
          mode === "lifestyleugc" && isFacialCategory
            ? "Face is allowed in this mode since the product requires facial interaction — otherwise stay faceless."
            : "Strictly FACELESS creator style throughout — use hands, POV, over-the-shoulder, body shots, and back views only. Never show the face.";

        const sceneLines = labels
          .map((label, i) => {
            const camera = cameraCycle[i % cameraCycle.length];
            const lighting = lightingCycle[i % lightingCycle.length];
            const audio = audioCycle[i % audioCycle.length];
            const action =
              socialActionByLabel[label] ||
              `showing the product in a ${label.toLowerCase()} moment`;
            return `SCENE ${String(i + 1).padStart(2, "0")} — ${label.toUpperCase()}\nACTION: ${action}\nCAMERA: ${camera}\nLIGHTING: ${lighting}\nAUDIO: ${audio}\nDURATION: ${durations[i]}s`;
          })
          .join("\n\n");

        const artStyleText =
          artStylePhrases[s.artStyle] || artStylePhrases.photoreal;
        const brandLine = brandName
          ? `Brand name/logo displayed in the top-right header: "${brandName}".`
          : "No brand logo (leave header brand area empty or generic).";
        const existingImageRule =
          s.storyboardFromExisting === "on"
            ? " The uploaded photo is a FINAL, already-generated shot — do not regenerate or restyle the pose, outfit, model, or background; reuse it exactly as the hero image and as the visual basis for every scene card."
            : "";

        return `Create ONE premium branded storyboard sheet image (single cohesive graphic, not separate panels) for "${productName}"${productDesc ? ` (${productDesc})` : ""}, using the uploaded product photo as the exact visual reference.

HEADER: Bold title "STORYBOARD FACELESS" top-left, with a mode badge pill reading "${socialModeBadgeLabels[mode]}" beside it. ${brandLine} Below the title, show the product name as a large heading and a subtitle line (category • hero feature). Left info column lists: DURATION ${totalDuration} SECONDS, SCENE COUNT ${labels.length} SCENES, RATIO ${s.aspect} VERTICAL, CREATOR FACELESS UGC. Right side shows a hero product image.${existingImageRule}

MAIN STORYBOARD: A grid of ${labels.length} scene cards, each containing only: a scene number badge, a large representative image of that scene, and four short labeled lines — ACTION, CAMERA, LIGHTING, AUDIO — plus a DURATION badge. One short phrase per field only, never long paragraphs.

${sceneLines}

CREATOR STYLE: ${facelessRule}

HOOK: The first scene must visually stop the scroll — no text hook, purely visual (unexpected close-up, fast reveal, oddly satisfying motion, or beautiful lighting).

SOUND DIRECTION (for reference/internal use, reflected in the AUDIO fields above): ${socialSoundEngine[mode]}.

FOOTER: Production notes row with four columns — RECOMMENDED CAMERA "Smartphone / Mirrorless Camera", RECOMMENDED FPS "24/30 FPS", RECOMMENDED LIGHTING "Natural Window Light / Soft Indoor", RECOMMENDED EDITING STYLE "Fast Cut • Smooth Transition, Zoom In/Out • Trending Reels Style".

ART STYLE & QUALITY: ${artStyleText}. The storyboard must resemble a creative agency pitch, Apple-style presentation, modern moodboard, or social media campaign board — never a plain chatgpt response, bullet list, spreadsheet, or article. Visual composition: roughly 85% images, 10% information text, 5% icons. Keep the product 100% consistent with the uploaded reference photo across every scene image — ${buildProductReferenceLine(s, productName, productDesc ? ` (${productDesc})` : "")} Overall sheet aspect ratio ${s.aspect}, ready to present to a client and ready for AI image/video generation from each scene.`;
      }

      function buildStoryboard(s, sceneCount) {
        if (s.storyboardStyle === "sheet") {
          return [
            {
              label: "SHEET STORYBOARD",
              text: buildSheetPrompt(s, sceneCount),
            },
          ];
        }
        if (s.storyboardStyle === "socialstudio") {
          return [
            {
              label: "STUDIO SOSIAL MEDIA (PREMIUM)",
              text: buildSocialStudioPrompt(s, sceneCount),
            },
          ];
        }

        const angleCycle = shuffleArray(
          Object.keys(shotTypePhrases).filter(
            (id) => !(povAngleExclude[s.povType] || []).includes(id),
          ),
        );
        const sbDurations = distributeDurations(
          getStoryboardDuration(),
          sceneCount,
        );
        const sbLighting = shuffleArray(socialLightingPool);
        const sbAudio = shuffleArray(socialAudioPool);
        let elapsed = 0;

        // ---- Based on an already-generated image: skip all visual-settings generation ----
        if (s.storyboardFromExisting === "on") {
          return getSceneRoles(sceneCount).map((role, i) => {
            const forcedAngle = angleCycle[i % angleCycle.length];
            const cameraLabel = shotTypeShortLabels[forcedAngle] || "Eye-Level";
            const actionLabel = deriveActionLabel(s);
            const title = pick(roleTitleBank[role]);
            const numberPart = panelNumberPhrase(s, i + 1);
            const basePrompt = `Using the uploaded product image as the exact visual reference — do NOT regenerate the pose, outfit, model, or background; keep everything exactly as shown in the uploaded image. Camera direction: ${shotTypePhrases[forcedAngle]}. ${roleAdditions[role]}.${numberPart}`;

            if (s.storyboardStyle === "withdesc") {
              const segDur = sbDurations[i];
              const startTc = Math.round(elapsed * 10) / 10;
              elapsed += segDur;
              const endTc = Math.round(elapsed * 10) / 10;
              const lighting = sbLighting[i % sbLighting.length];
              const audio = sbAudio[i % sbAudio.length];
              const captionPart =
                s.autoCaption === "off"
                  ? ""
                  : `HEADLINE: (AI to auto-write a short caption in ${getCaptionLanguageText(s)} that genuinely fits this product & scene — not generic filler)\n`;
              const breakdown = `${captionPart}ACTION: ${actionLabel}\nCAMERA: ${cameraLabel}\nLIGHTING: ${lighting}\nAUDIO: ${audio}\nDURATION: ${segDur}s (${startTc}s – ${endTc}s)`;
              return {
                label: `${String(i + 1).padStart(2, "0")} — ${title}`,
                text: `${breakdown}\n\n${basePrompt}`,
              };
            }
            return { label: `PANEL ${i + 1}`, text: basePrompt };
          });
        }

        const framingCycle = shuffleArray(
          s.model !== "none" ? framingOptionsWithPerson : framingOptions,
        );

        return getSceneRoles(sceneCount).map((role, i) => {
          const forcedAngle = angleCycle[i % angleCycle.length];
          const forcedFraming = framingCycle[i % framingCycle.length];
          const core = buildCore(s, forcedAngle, forcedFraming);
          const title = pick(roleTitleBank[role]);
          let prompt =
            s.promptFormat === "structured"
              ? `${formatStructured(core, s)}\n[SCENE ROLE]: ${roleAdditions[role]}`
              : `${formatImage(core, s)} ${roleAdditions[role]}.`;
          prompt += panelNumberPhrase(s, i + 1);

          if (s.storyboardStyle === "withdesc") {
            const segDur = sbDurations[i];
            const startTc = Math.round(elapsed * 10) / 10;
            elapsed += segDur;
            const endTc = Math.round(elapsed * 10) / 10;
            const cameraLabel = shotTypeShortLabels[forcedAngle] || "Eye-Level";
            const actionLabel = deriveActionLabel(s);
            const lighting = sbLighting[i % sbLighting.length];
            const audio = sbAudio[i % sbAudio.length];
            const captionPart =
              s.autoCaption === "off"
                ? ""
                : `HEADLINE: (AI to auto-write a short caption in ${getCaptionLanguageText(s)} that genuinely fits this product & scene — not generic filler)\n`;
            const breakdown = `${captionPart}ACTION: ${actionLabel}\nCAMERA: ${cameraLabel}\nLIGHTING: ${lighting}\nAUDIO: ${audio}\nDURATION: ${segDur}s (${startTc}s – ${endTc}s)`;
            const text = `${breakdown}\n\n${prompt}`;
            return {
              label: `${String(i + 1).padStart(2, "0")} — ${title}`,
              text,
            };
          }
          return { label: `PANEL ${i + 1}`, text: prompt };
        });
      }

      // ---------- MULTI-IMAGE COMPOSITE MODE ----------
      // Combines multiple uploaded reference images: Image 1 = product, Image 2 = LOCKED background,
      // Images 3-5 = optional extra elements. Background never changes across regenerations;
      // only composition/angle/arrangement of the product & elements vary.
      function buildMultiImagePrompt(s) {
        const productName =
          document.getElementById("productName").value.trim() || "the product";
        const productDesc = document.getElementById("productDesc").value.trim();
        const descPart = productDesc ? ` (${productDesc})` : "";
        const core = buildCore(s);

        const extras = ["extraImg1", "extraImg2", "extraImg3"]
          .map((id) => document.getElementById(id).value.trim())
          .filter(Boolean);

        const extraLines = extras
          .map(
            (desc, i) =>
              `Image ${i + 3}: ${desc} — incorporate this element naturally into the scene, matching the lighting and perspective of the background.`,
          )
          .join("\n");

        const extraSection = extras.length ? `\n${extraLines}\n` : "\n";

        return `Composite the uploaded reference images into ONE cohesive, photorealistic scene.

Image 1: "${productName}"${descPart} — the product. Preserve it exactly as shown — same shape, color, material, label, and design.
Image 2: the background/scene. THIS IS LOCKED — use it as the exact, unchanged backdrop. Do NOT regenerate, repaint, restyle, extend, recolor, or alter the background in any way; it must remain pixel-consistent with Image 2 in every generation.${extraSection}
Composition for this variation: ${core.angleText}, ${core.framingPhrase}. Place the product ${s.model !== "none" ? "held naturally by a hand, fully visible in frame" : "positioned naturally within the scene"}, arranged harmoniously with the background's existing lighting, shadows, and perspective so everything looks like one real photograph taken in that exact location. ${core.lightingPhrase} should blend with the background's own light direction.

Each new generation should ONLY vary the product placement, camera angle, framing, and arrangement of the added elements — the background from Image 2 stays identical every time. Photorealistic, highly detailed, seamless compositing with matched color grading. Aspect ratio ${s.aspect}.`;
      }

      // ---------- GENERATE / REGENERATE ----------
      const SAFETY_REMINDER =
        "Safety check: do not depict, mention, or imitate any real, famous, or trademarked brand names, logos, or copyrighted characters. Ensure all rendered/burned-in text is clean, correctly spelled, and legible — avoid garbled, duplicated, or nonsensical text. Do not include misleading links, fake QR codes, clickbait phrases, or any link-manipulation / \"link bait\" elements.";

      function buildFrames() {
        if (state.outputType === "image" && state.multiImage === "on") {
          return [
            {
              label: "GABUNG GAMBAR (BG DIKUNCI)",
              text: buildMultiImagePrompt(state),
            },
          ];
        }

        if (state.outputType === "image" && state.storyboardMode === "on") {
          const qty = getQuantity();
          if (state.storyboardStyle === "ugc") {
            return generateUgcFrames(state, qty);
          }
          return buildStoryboard(state, qty);
        }

        if (state.outputType === "video") {
          const beats = Math.max(1, Math.round(getVideoDuration() / 3));
          const label =
            state.basedOnSheet === "on" ? "VIDEO DARI SHEET" : "VIDEO";
          return [{ label, text: buildContinuousVideoPrompt(state, beats) }];
        }

        const frames = [];
        frames.push({ label: `GAMBAR`, text: buildOnePrompt(state) });
        return frames;
      }

      function generateFrames() {
        return buildFrames().map((frame) => ({
          ...frame,
          text: `${frame.text}\n\n${SAFETY_REMINDER}`,
        }));
      }

      function copyToClipboard(text, btn) {
        const original = btn.textContent;
        const showResult = (ok) => {
          btn.textContent = ok
            ? "✓ Disalin!"
            : "✗ Gagal, cuba pilih & copy manual";
          setTimeout(() => (btn.textContent = original), ok ? 1400 : 2200);
        };

        const fallbackCopy = () => {
          try {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            ta.style.top = "0";
            ta.style.left = "0";
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            const ok = document.execCommand("copy");
            document.body.removeChild(ta);
            showResult(ok);
          } catch (e) {
            showResult(false);
          }
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(text)
            .then(() => showResult(true))
            .catch(fallbackCopy);
        } else {
          fallbackCopy();
        }
      }

      function renderFrames(frames) {
        const container = document.getElementById("framesContainer");
        container.innerHTML = frames
          .map(
            (f, i) => `
    <div class="frame-block">
      <div class="frame-meta"><span>${f.label}</span><span>${state.aspect}</span></div>
      <div class="prompt-body">${f.text}</div>
      <button class="mini-copy" data-index="${i}">📋 Copy Frame Ni</button>
    </div>
  `,
          )
          .join("");
        container.querySelectorAll(".mini-copy").forEach((btn) => {
          btn.addEventListener("click", () =>
            copyToClipboard(frames[btn.dataset.index].text, btn),
          );
        });
        document.getElementById("filmstrip").classList.add("show");
        document.getElementById("floatCollapseBtn").classList.remove("hidden");
        // Land the user at the TOP of the freshly generated prompt, not mid-scroll —
        // "Skip Ke Bawah" right there lets them jump straight to Copy without reading through.
        document
          .getElementById("filmstrip")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      }

      document.getElementById("generateBtn").addEventListener("click", () => {
        lastState = { ...state };
        lastFrames = generateFrames();
        renderFrames(lastFrames);
        saveToHistory(lastFrames);
      });

      document.getElementById("regenBtn").addEventListener("click", () => {
        if (!lastState) return;
        lastFrames = generateFrames();
        renderFrames(lastFrames);
        saveToHistory(lastFrames);
      });

      document.getElementById("copyAllBtn").addEventListener("click", () => {
        const combined = lastFrames
          .map((f) => `${f.label}\n${f.text}`)
          .join("\n\n---\n\n");
        copyToClipboard(combined, document.getElementById("copyAllBtn"));
      });

      // ---------- HISTORY (persisted) ----------
      // Works both inside Claude.ai artifacts (window.storage) and on standalone deployments (localStorage).
      async function storageGet(key) {
        if (typeof window.storage !== "undefined" && window.storage.get) {
          try {
            const result = await window.storage.get(key, false);
            return result ? result.value : null;
          } catch (e) {
            /* fall through to localStorage */
          }
        }
        try {
          return localStorage.getItem(key);
        } catch (e) {
          return null;
        }
      }

      async function storageSet(key, value) {
        if (typeof window.storage !== "undefined" && window.storage.set) {
          try {
            await window.storage.set(key, value, false);
            return;
          } catch (e) {
            /* fall through */
          }
        }
        try {
          localStorage.setItem(key, value);
        } catch (e) {}
      }

      async function loadHistory() {
        try {
          const value = await storageGet("candid-history");
          return value ? JSON.parse(value) : [];
        } catch (e) {
          return [];
        }
      }

      async function saveToHistory(frames) {
        try {
          const productName =
            document.getElementById("productName").value.trim() ||
            "Tanpa nama produk";
          const history = await loadHistory();
          history.unshift({
            product: productName,
            type: state.outputType,
            frames: frames,
            time: new Date().toLocaleString("ms-MY", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
          const trimmed = history.slice(0, 12);
          await storageSet("candid-history", JSON.stringify(trimmed));
          renderHistory(trimmed);
        } catch (e) {
          console.error("Gagal simpan riwayat", e);
        }
      }

      const typeIcons = { image: "🖼️", video: "🎬", storyboard: "📋" };

      let expandedHistoryIndex = null;

      function renderHistory(history) {
        const list = document.getElementById("historyList");
        if (!history.length) {
          list.innerHTML =
            '<div class="history-empty">Belum ada prompt dijana lagi.</div>';
          return;
        }
        list.innerHTML = history
          .map((item, i) => {
            const preview = item.frames
              .map((f) => f.text)
              .join(" ")
              .slice(0, 140);
            const icon = typeIcons[item.type] || "🖼️";
            const isExpanded = expandedHistoryIndex === i;
            const framesHtml = item.frames
              .map(
                (f, fi) => `
      <div class="frame-block">
        <div class="frame-meta">${f.label}</div>
        <div class="prompt-body">${f.text}</div>
        <button class="mini-copy" data-frame="${fi}">📋 Copy Prompt Ni</button>
      </div>`,
              )
              .join("");
            const expandHtml = isExpanded
              ? `
      <div class="history-expand">
        ${framesHtml}
        <div class="history-expand-actions">
          <button class="copy-btn" data-action="copyall">📋 Copy Semua</button>
          <button data-action="close">✕ Tutup</button>
        </div>
      </div>`
              : "";
            return `
    <div class="history-item ${isExpanded ? "expanded" : ""}" data-index="${i}">
      <div class="history-top"><span>${icon} ${item.product} · ${item.frames.length} frame</span><span>${item.time}</span></div>
      <div class="history-text ${isExpanded ? "hide" : ""}">${preview}…</div>
      ${expandHtml}
    </div>
  `;
          })
          .join("");

        list.querySelectorAll(".history-item").forEach((el) => {
          const idx = parseInt(el.dataset.index, 10);
          // clicking the header area toggles expansion
          el.querySelector(".history-top").addEventListener("click", () => {
            expandedHistoryIndex = expandedHistoryIndex === idx ? null : idx;
            renderHistory(history);
          });
          const textEl = el.querySelector(".history-text");
          if (textEl)
            textEl.addEventListener("click", () => {
              expandedHistoryIndex = idx;
              renderHistory(history);
            });

          // expanded controls
          el.querySelectorAll(".mini-copy").forEach((btn) => {
            btn.addEventListener("click", (e) => {
              e.stopPropagation();
              const fi = parseInt(btn.dataset.frame, 10);
              copyToClipboard(history[idx].frames[fi].text, btn);
            });
          });
          const copyAllBtn = el.querySelector('[data-action="copyall"]');
          if (copyAllBtn)
            copyAllBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              const combined = history[idx].frames
                .map((f) => `${f.label}\n${f.text}`)
                .join("\n\n---\n\n");
              copyToClipboard(combined, copyAllBtn);
            });
          const closeBtn = el.querySelector('[data-action="close"]');
          if (closeBtn)
            closeBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              expandedHistoryIndex = null;
              renderHistory(history);
            });
        });
      }

      document
        .getElementById("floatCollapseBtn")
        .addEventListener("click", () => {
          document.getElementById("filmstrip").classList.remove("show");
          document.getElementById("floatCollapseBtn").classList.add("hidden");
        });

      document.getElementById("scrollTopBtn").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      document
        .getElementById("scrollBottomBtn")
        .addEventListener("click", () => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        });
      document.getElementById("skipToCopyBtn").addEventListener("click", () => {
        document
          .querySelector(".output-actions")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      });

      document
        .getElementById("clearHistory")
        .addEventListener("click", async (e) => {
          const btn = e.target;
          if (btn.disabled) return;
          btn.disabled = true;
          const originalText = btn.textContent;
          btn.textContent = "Memadam...";
          try {
            await storageSet("candid-history", JSON.stringify([]));
            expandedHistoryIndex = null;
            renderHistory([]);
          } catch (e) {
            console.error("Gagal padam riwayat", e);
          } finally {
            btn.disabled = false;
            btn.textContent = originalText;
          }
        });

      document.getElementById("resetBtn").addEventListener("click", () => {
        Object.assign(state, defaultState);

        document
          .querySelectorAll(
            '.pill-group:not([data-multi="true"]), .color-group',
          )
          .forEach((group) => {
            const key = group.dataset.group;
            group.querySelectorAll(".pill, .swatch").forEach((p) => {
              p.classList.toggle("active", p.dataset.value === state[key]);
            });
          });
        document
          .querySelectorAll('[data-multi="true"] .pill')
          .forEach((p) => p.classList.remove("active"));

        [
          "productType",
          "productName",
          "productDesc",
          "userScene",
          "customBg",
          "customColorInput",
          "customOutfitInput",
          "brandNameInput",
          "extraImg1",
          "extraImg2",
          "extraImg3",
          "customTextStyleInput",
          "customPlacementInput",
        ].forEach((id) => {
          document.getElementById(id).value = "";
        });

        document.getElementById("sceneChoices").classList.add("hidden");
        document.getElementById("sceneCardUserText").textContent = "";
        document.getElementById("suggestedScenesList").innerHTML = "";
        suggestedSceneCount = 0;
        usedSceneTexts.clear();
        currentProductScenes = [];
        document.getElementById("sceneLimitNote").style.display = "none";
        document
          .querySelectorAll(".scene-card")
          .forEach((c) => c.classList.remove("active"));
        document.getElementById("sceneCardUser").classList.add("hidden");

        if (!document.getElementById("advPin").checked)
          document.getElementById("advPanel").classList.remove("show");
        if (!document.getElementById("kawaiiPin").checked)
          document.getElementById("kawaiiPanel").classList.remove("show");
        document.getElementById("autoSceneNote").style.display = "none";
        document.getElementById("filmstrip").classList.remove("show");
        document.getElementById("floatCollapseBtn").classList.add("hidden");
        document.getElementById("framesContainer").innerHTML = "";
        expandedHistoryIndex = null;

        lastState = null;
        lastFrames = [];

        document.getElementById("quantityInput").value = 6;
        document.getElementById("storyboardDurationInput").value = 15;
        document.getElementById("videoDurationInput").value = 10;
        setPillValue("productCategory", "auto");
        document.getElementById("categoryPanel").classList.remove("show");
        updateCategoryNote();
        updateQuantityUI();
        updateVisibility();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      // ---------- INIT ----------
      (async function init() {
        // restore saved Platform & Saiz preferences
        try {
          const savedPlatform = localStorage.getItem("candid-pref-platform");
          const savedAspect = localStorage.getItem("candid-pref-aspect");
          if (savedPlatform) {
            setPillValue("platform", savedPlatform);
          }
          if (savedAspect) {
            setPillValue("aspect", savedAspect);
          }
        } catch (e) {}

        updateVisibility();
        updateQuantityUI();
        updateCategoryNote();
        const history = await loadHistory();
        renderHistory(history);
      })();
