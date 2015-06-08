// Copyright 2015 by Paulo Augusto Peccin. See license.txt distributed with this file.

SlotFormats = {

    "Empty": {
        name: "Empty",
        desc: "Empty Slot",
        priority: 101,
        tryFormat: function (rom) {
            if (!rom || !rom.content || rom.content.length === 0) return this;
        },
        createFromROM: function (rom) {
            return new SlotEmpty(this);
        },
        createFromSaveState: function (state) {
            return SlotEmpty.createFromSaveState(state);
        }
    },

    "BIOS": {
        name: "BIOS",
        desc: "32K BIOS Slot",
        priority: 102,
        tryFormat: function (rom) {
            // Assumes any 16K or 32K content not starting with the Cartridge identifier "AB" is a BIOS
            if ((rom.content.length === 16384 || rom.content.length === 32768) && rom.content[0] !== 65 && rom.content[1] !== 66) return this;
        },
        createFromROM: function (rom) {
            return new BIOS(rom);
        },
        createFromSaveState: function (state) {
            return BIOS.createFromSaveState(state);
        }
    },

    "RAM64K": {
        name: "RAM64K",
        desc: "RAM 64K Slot",
        priority: 103,
        tryFormat: function (rom) {
            // Not Possible to load RAMs yet
            return null;
        },
        createFromROM: null,
        createFromSaveState: function (state) {
            return SlotRAM64K.createFromSaveState(state);
        }
    },

    "Cartridge32K": {
        name: "Cartridge32K",
        desc: "32K Plain ROM Cartridge",
        priority: 111,
        tryFormat: function (rom) {
            // For now assume any 32K or 16K content starting with the Cartridge identifier "AB" is a Cartridge32K
            if ((rom.content.length === 32768 || rom.content.length === 16384)
                && rom.content[0] === 65 && rom.content[1] === 66) return this;
        },
        createFromROM: function (rom) {
            return new Cartridge32K(rom);
        },
        createFromSaveState: function (state) {
            return Cartridge32K.createFromSaveState(state);
        }
    },

    "CartridgeASCII8K": {
        name: "CartridgeASCII8K",
        desc: "ASCII8K Cartridge",
        priority: 112,
        tryFormat: function (rom) {
            // For now assume any >64K content starting with the Cartridge identifier "AB" is a CartridgeASCII16K
            if (rom.content.length > 65536 && rom.content[0] === 65 && rom.content[1] === 66) return this;
        },
        createFromROM: function (rom) {
            return new CartridgeASCII8K(rom);
        },
        createFromSaveState: function (state) {
            return CartridgeASCII8K.createFromSaveState(state);
        }
    },

    "CartridgeASCII16K": {
        name: "CartridgeASCII16K",
        desc: "ASCII16K Cartridge",
        priority: 113,
        tryFormat: function (rom) {
            // For now assume any 64K content starting with the Cartridge identifier "AB" is a CartridgeASCII16K
            if (rom.content.length === 65536 && rom.content[0] === 65 && rom.content[1] === 66) return this;
        },
        createFromROM: function (rom) {
            return new CartridgeASCII16K(rom);
        },
        createFromSaveState: function (state) {
            return CartridgeASCII16K.createFromSaveState(state);
        }
    }

};
