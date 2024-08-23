const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleMiner = require('role.miner');
const structureTower = require('structure.tower');
const spawnCreeps = require('spawnCreeps');
const roleMineralHarvester = require('role.mineralHarvester');
const roleRemoteMiner = require('role.remoteMiner');

module.exports.loop = function () {

    //Clear dead creeps from memory
    if (Game.time % 17 === 0) {
        for (const name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log(`Deleting creep ${name} from memory.`);
            }
        }
    }

    for (const room in Game.rooms) {
        let numberOfRemoteMiners = 0;
        const ticksToSpawnNew = Math.floor((Game.rooms[room].energyCapacityAvailable / (200 / 3)) * 3);
        const numberOfHarvesters = Game.rooms[room].find(FIND_MY_CREEPS, {
            filter: (m) => { return m.memory.role == 'harvester' && m.ticksToLive > ticksToSpawnNew }
        }
        ).length;
        const numberOfUpgraders = Game.rooms[room].find(FIND_MY_CREEPS, {
            filter: (m) => { return m.memory.role == 'upgrader' && m.ticksToLive > ticksToSpawnNew }
        }
        ).length;
        const numberOfMiners = Game.rooms[room].find(FIND_MY_CREEPS, {
            filter: (m) => { return m.memory.role == 'miner' }
        }
        ).length;
        const numberOfMineralHarvesters = Game.rooms[room].find(FIND_MY_CREEPS, {
            filter: (m) => { return m.memory.role == 'mineralHarvester' }
        }
        ).length;
        
        for (let i in Game.creeps) {
            if (Game.creeps[i].memory.role == 'remoteMiner') {
                numberOfRemoteMiners++
            }
        }

        const extractor = Game.rooms[room].find(FIND_MY_STRUCTURES,
            { filter: (e) => { return e.structureType == STRUCTURE_EXTRACTOR } });
        const mineral = Game.rooms[room].find(FIND_MINERALS);

        let minHarvesters = 0;
        let minUpgraders = 0;
        let minMiners = 0;
        let minMineralHarvesters = 0;
        let minRemoteMiners = 0;

        if (Game.rooms[room].controller) {
        switch (Game.rooms[room].controller.level) {
            case 1:
                minHarvesters = 1;
                minUpgraders = 3;
                break;
            case 2:
                minHarvesters = 1;
                minUpgraders = 5;
                break;
            case 3:
                minHarvesters = 2;
                minUpgraders = 4;
                minMiners = Game.rooms[room].find(FIND_STRUCTURES,
                    { filter: (c) => { return c.structureType == STRUCTURE_CONTAINER } }).length;
                minRemoteMiners = 0;
                break;
            case 4:
                minHarvesters = 2;
                minUpgraders = 4;
                minMiners = Game.rooms[room].find(FIND_STRUCTURES,
                    { filter: (c) => { return c.structureType == STRUCTURE_CONTAINER } }).length;
                minRemoteMiners = 0;
                break;
            case 5:
                minHarvesters = 2;
                minUpgraders = 4;
                minMiners = Game.rooms[room].find(FIND_STRUCTURES,
                    { filter: (c) => { return c.structureType == STRUCTURE_CONTAINER } }).length;
                minRemoteMiners = 0;
                break;
             case 6:
                minHarvesters = 2;
                minUpgraders = 4;
                minMiners = Game.rooms[room].find(FIND_STRUCTURES,
                    { filter: (c) => { return c.structureType == STRUCTURE_CONTAINER } }).length;
                minRemoteMiners = 0;
                break;
            default:
                minHarvesters = 2;
                minUpgraders = 4;
                minMineralHarvesters = 1;
                minMiners = Game.rooms[room].find(FIND_STRUCTURES,
                    { filter: (c) => { return c.structureType == STRUCTURE_CONTAINER } }).length;
                minRemoteMiners = 0;
        }
    }

        const spawnsInRoom = Game.rooms[room].find(FIND_MY_SPAWNS);
        for (const spawn of spawnsInRoom) {
            const totalCreepsInRoom = _.sum(Game.creeps, (c) => c.memory.currentRoom == room);

            if (!Game.spawns[spawn.name].spawning) {
                if ((totalCreepsInRoom == 0 || numberOfHarvesters == 0) && Game.rooms[room].energyAvailable >= 300) {
                    spawnCreeps.soloHarvester(Game.spawns[spawn.name], Game.rooms[room]);
                } else if (numberOfMiners < minMiners || Game.rooms[room].memory.spawnMiner) {
                    spawnCreeps.miner(Game.spawns[spawn.name], Game.rooms[room]);
                } else if (numberOfHarvesters < minHarvesters) {
                    spawnCreeps.run(Game.spawns[spawn.name], Game.rooms[room], 'harvester');
                } else if (numberOfMineralHarvesters < minMineralHarvesters) {
                    spawnCreeps.mineralHarvester(Game.spawns[spawn.name], Game.rooms[room], extractor[0].id, mineral[0].id);
                } else if (numberOfRemoteMiners < minRemoteMiners) {
                    spawnCreeps.remoteMiner(Game.spawns[spawn.name], Game.rooms[room], 'E13S45');
                } else if (numberOfUpgraders < minUpgraders) {
                    spawnCreeps.run(Game.spawns[spawn.name], Game.rooms[room], 'upgrader');
                }
            }

            const towers = Game.rooms[room].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            for (const tower of towers) {
                structureTower.run(tower);
            }

            for (const name in Game.creeps) {
                const creep = Game.creeps[name];
                if (creep.memory.role == 'miner') {
                    roleMiner.run(creep);
                }
                if (creep.memory.role == 'harvester') {
                    roleHarvester.run(creep);
                }
                if (creep.memory.role == 'mineralHarvester') {
                    roleMineralHarvester.run(creep);
                }
                if (creep.memory.role == 'upgrader') {
                    roleUpgrader.run(creep);
                }
                if (creep.memory.role == 'remoteMiner') {
                    roleRemoteMiner.run(creep);
                }
            }
        }
    }
};