const roleRemoteMiner = {

    /** @param {Creep} creep **/
    run: function (creep) {

        /*
        const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        const spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS,
            { filter: (s) => { return s.store.getFreeCapacity(RESOURCE_ENERGY) > 0 } });
        const extension = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
            { filter: (e) => { return e.structureType == STRUCTURE_EXTENSION && e.store.getFreeCapacity(RESOURCE_ENERGY) > 0 } });
        const tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
            { filter: (t) => { return t.structureType == STRUCTURE_TOWER && t.store.getFreeCapacity(RESOURCE_ENERGY) > 0 } });
        */
        const storage = Game.rooms[creep.memory.homeRoom].storage;



        if ((creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 && !creep.memory.working) || creep.ticksToLive < 60) {
            creep.memory.working = true;
            // creep.say('⚡ transfer');
        } else if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            //  creep.say('🔄 harvest');
        }

        if (!creep.memory.working) {
            const droppedEnergy = creep.pos.lookFor(LOOK_RESOURCES, {
                filter: (r) => creep.pos.inRangeTo(r, 10)
            });
            if (droppedEnergy.length) {
                console.log(creep.pickup(droppedEnergy[0]));
                if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy[0]);
                }
            } else if (creep.room == creep.memory.homeRoom) {
                const route = Game.map.findRoute(creep.room, creep.memory.sourceRoom);
                if (route.length) {
                    const exit = creep.pos.findClosestByRange(route[0].exit);
                    creep.moveTo(exit);
                }

            } else if (creep.room == creep.memory.sourceRoom && !creep.memory.working) {
                const remoteMineral = creep.room.find(FIND_MINERALS);
                console.log(remoteMineral);
                const remoteSource = creep.room.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                console.log(remoteSource);
                if (creep.harvest(remoteSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(remoteSource, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        } else if (storage) {
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffaa00' } })
            };

        }
    }
};

module.exports = roleRemoteMiner;