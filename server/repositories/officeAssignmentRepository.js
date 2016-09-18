import dbInit from '../database/database';
import Promise from 'bluebird';

export default {
    init,
    saveOfficeAssignment,
    deleteOfficeAssignmentByInstructorId
};

const db = dbInit.init();
let officeAssignmentModel = db.models.OfficeAssignment;

function init(db) {
    officeAssignmentModel = db.models.OfficeAssignment;
}

function getOfficeAssignmentByInstructorId(instructorId) {
    let options = {
        where: {instructorId: instructorId}
    };

    return officeAssignmentModel.findOne(options);
}

function saveOfficeAssignment(officeAssignment, instructorId) {
    return getOfficeAssignmentByInstructorId(instructorId)
        .then((office) => {
            if (office) {
                office.location = officeAssignment.location;

                return office.save();
            }

            if (!office && officeAssignment.location) {
                office = {
                    location: officeAssignment.location,
                    instructorId: instructorId
                };

                return officeAssignmentModel.create(office);
            }

            return Promise.resolve(null);
        });
}

function deleteOfficeAssignmentByInstructorId(instructorId) {
    return getOfficeAssignmentByInstructorId(instructorId)
        .then((office) => {
            if (office) {
                return office.destroy();
            }

            return Promise.resolve(null);
        });
}