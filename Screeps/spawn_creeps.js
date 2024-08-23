const spawnCreeps = {

    /** 
     *  @param {structureSpawn} spawn 
     *  @param {Room} room
     *  @param {String} role
     * 
    */
    run: function (spawn, room, role) {

        const name = '' + role + Game.time;
        const energyAvailable = Game.rooms[room.name].energyAvailable;
        const energyCapacity = Game.rooms[room.name].energyCapacityAvailable;
        let creep = {};
        let body = [];

        if (energyAvailable === energyCapacity || energyAvailable >= 850) {

            //Build body

            const parts = Math.floor(energyAvailable / 200); //for every 200 energy, add WORK, CARRY, MOVE
            const leftover = Math.floor((energyAvailable % 200) / 50); //for every 50 energy leftover, add MOVE then CARRY

            for (let j = 0; j < 5 && j < parts; j++) {
                body.push(WORK);
                body.push(MOVE);
                body.push(CARRY);
            }

            for (let i = 0; i < leftover;) {
                body.push(CARRY);
                i += 1;
                if (i < leftover) {
                    body.push(MOVE);
                    i += 1;
                }
            }

            creep = Game.spawns[spawn.name].spawnCreep(body, name, {
                memory: {
                    role: role,
                    working: false,
                    homeRoom: room.name,
                    currentRoom: room.name
                }
            });
            console.log(`Spawning new ${role} creep named ${name}.`);
            console.log(body);
        }
    },

    miner: function (spawn, room) {

        let minePos = '';

        if (Game.rooms[room.name].memory.spawnMiner) {
            minePos = Game.rooms[room.name].memory.spawnMinerId;
        } else {
            const availableContainers = Game.rooms[room.name].find(FIND_STRUCTURES,
                { filter: (c) => { return c.structureType == STRUCTURE_CONTAINER } });
            for (let i of availableContainers) {
                if (!minePos.length && !i.pos.lookFor(LOOK_CREEPS).length) {
                    minePos = i.id;
                    break;
                }
            }
        }
        Game.spawns[spawn.name].spawnCreep([MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK], 'miner' + Game.time, {
            memory: {
                role: 'miner',
                homeRoom: room.name,
                currentRoom: room.name,
                mineId: minePos
            }
        });
        Game.rooms[room.name].memory.spawnMiner = false;
        Game.rooms[room.name].memory.spawnMinerId = null;
    },


    soloHarvester: function (spawn, room) {
        Game.spawns[spawn.name].spawnCreep([WORK, MOVE, MOVE, CARRY, CARRY], 'soloHarvester' + Game.time, {
            memory: {
                role: 'harvester',
                working: false,
                homeRoom: room.name,
                currentRoom: room.name
            }
        });
        console.log('Spawning solo Harvester');
    },

    mineralHarvester: function (spawn, room, extractor, mineral) {
        const energyAvailable = Game.rooms[room.name].energyAvailable;
        const energyCapacity = Game.rooms[room.name].energyCapacityAvailable;
        let creep = {};
        let body = [];

        if (energyAvailable === energyCapacity || energyAvailable >= 1550) {

            //Build body

            const parts = Math.floor(energyAvailable / 200); //for every 200 energy, add WORK, CARRY, MOVE
            const leftover = Math.floor((energyAvailable % 200) / 50); //for every 50 energy leftover, add MOVE then CARRY

            for (let j = 0; j < 5 && j < parts; j++) {
                body.push(WORK);
                body.push(MOVE);
                body.push(CARRY);
            }

            for (let i = 0; i < leftover;) {
                body.push(CARRY);
                i += 1;
                if (i < leftover) {
                    body.push(MOVE);
                    i += 1;
                }
            }

            creep = Game.spawns[spawn.name].spawnCreep(body, 'mineralHarvester' + Game.time, {
                memory: {
                    role: 'mineralHarvester',
                    working: false,
                    homeRoom: room.name,
                    currentRoom: room.name,
                    extractor: extractor,
                    mineral: mineral
                }
            });
            console.log(`Spawning new mineralHarvester creep.`);
            console.log(body);
        }
    },

    remoteMiner: function (spawn, room, sourceRoom) {
        const energyAvailable = Game.rooms[room.name].energyAvailable;
        const energyCapacity = Game.rooms[room.name].energyCapacityAvailable;
        let creep = {};
        let body = [];

        if (energyAvailable === energyCapacity || energyAvailable >= 950) {

            //Build body

            const parts = Math.floor(energyAvailable / 200); //for every 200 energy, add WORK, CARRY, MOVE
            const leftover = Math.floor((energyAvailable % 200) / 50); //for every 50 energy leftover, add MOVE then CARRY

            for (let j = 0; j < 4 && j < parts; j++) {
                body.push(WORK);
                body.push(MOVE);
                body.push(CARRY);
            }

            for (let i = 0; i < leftover;) {
                body.push(CARRY);
                i += 1;
                if (i < leftover) {
                    body.push(MOVE);
                    i += 1;
                }
            }

            creep = Game.spawns[spawn.name].spawnCreep(body, 'remoteMiner' + Game.time + sourceRoom, {
                memory: {
                    role: 'remoteMiner',
                    working: false,
                    homeRoom: room.name,
                    currentRoom: room.name,
                    sourceRoom: sourceRoom
                }
            });
            console.log(`Spawning new remoteMiner to mine ${sourceRoom}.`);
            console.log(body);
        }
    }

};
module.exports = spawnCreeps;