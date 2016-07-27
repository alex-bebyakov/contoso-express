import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal, Button} from 'react-bootstrap';
import * as _ from 'lodash';
import helper from '../../helpers/uiHelper';
import * as studentActions from '../../actions/studentActions';
import StudentForm from './StudentForm';

interface State {
    student: any,
    errors: any,
    saving: boolean,
    visible: boolean,
    close(): void
}

interface Props {
    student: any,
    saving: boolean,
    visible: boolean,
    close(): void,
    actions: any
}

class StudentSave extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            student: _.assign({}, props.student),
            errors: {},
            saving: false,
            visible: props.visible,
            close: props.close
        };

        this.updateStudentState = this.updateStudentState.bind(this);
        this.saveStudent = this.saveStudent.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({student: _.assign({}, nextProps.student)} as State);
    }

    updateStudentState(event) {
        let student = this.state.student;

        //for date picker change
        if (_.isString(event)) {
            student.enrollmentDate = event;
        } else {
            const field = event.target.name;
            student[field] = event.target.value;
        }

        return this.setState({student: student} as State);
    }

    studentFormIsValid() {
        let student = this.state.student;
        let formIsValid = true;
        let errors: any = {};

        if (!student.firstName) {
            errors.firstName = 'The First Name field is required.';
            formIsValid = false;
        }

        if (!student.lastName) {
            errors.lastName = 'The Last Name field is required.';
            formIsValid = false;
        }

        if (!student.enrollmentDate) {
            errors.date = 'The Enrollment Date field is required.';
            formIsValid = false;
        }

        this.setState({errors: errors} as State);
        return formIsValid;
    }
    
    saveStudent(event) {
        event.preventDefault();

        if (!this.studentFormIsValid()) {
            return;
        }

        this.setState({saving: true} as State);

        this.props.actions.saveStudent(this.state.student)
            .then(() => {
                this.props.close();

                let message = this.state.student.id ? 'Student updated' : 'Student added';
                helper.showMessage(message);
            })
            .catch(err => {
                this.setState({saving: false} as State);
            });
    }

    render() {
        let header = this.props.student.id ? 'Edit Student' : 'Create Student';

        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>{header}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <StudentForm
                            student={this.state.student}
                            onChange={this.updateStudentState}
                            errors={this.state.errors}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.saveStudent}>
                            {this.props.saving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

(StudentSave as any).propTypes = {
    student: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        student: _.cloneDeep(state.student.current)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: (bindActionCreators as any)(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentSave);