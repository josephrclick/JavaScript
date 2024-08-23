const roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {

        const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

        if ((creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 && !creep.memory.working) || creep.ticksToLive < 80) {
            creep.memory.working = true;
            //  creep.say('⚡ upgrade');
        } else if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            //  creep.say('🔄 harvest');
        }

        const containerEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES,
            { filter: (c) => { return c.structureType == STRUCTURE_CONTAINER && c.store[RESOURCE_ENERGY] > 100 } });
        const storageEnergy = creep.room.storage;

        if (!creep.memory.working) {
            if (storageEnergy && storageEnergy.store[RESOURCE_ENERGY] > 100) {
                if (creep.withdraw(storageEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storageEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else if (containerEnergy) {
                const droppedEnergy = containerEnergy.pos.lookFor(LOOK_RESOURCES);
                if (droppedEnergy.length) {
                    console.log(creep.pickup(droppedEnergy[0]));
                    if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(droppedEnergy[0]);
                    }
                } else if (creep.withdraw(containerEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containerEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else if (source) {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        } else {

            const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

            if (!target) {
                /*if(creep.signController(creep.room.controller, 'Room of Noob. Quarantine 2020!') == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }*/
                //console.log('upgrading');
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                //console.log('building');
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};

module.exports = roleUpgrader;