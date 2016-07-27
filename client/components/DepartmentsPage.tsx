import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DepartmentsList from './department/DepartmentsList';
import DepartmentSave from './department/DepartmentSave';
import DepartmentDetails from './department/DepartmentDetails';
import DepartmentDelete from './department/DepartmentDelete';
import * as departmentActions from '../actions/departmentActions';

interface State {
    departments: any[],
    saveModalVisible: boolean,
    detailsModalVisible: boolean,
    confirmationVisible: boolean
}

interface Props {
    departments: any[],
    actions: any
}

class DepartmentsPage extends React.Component<Props, State> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            departments: props.departments,
            saveModalVisible: false,
            detailsModalVisible: false,
            confirmationVisible: false
        };

        this.showSaveModal = this.showSaveModal.bind(this);
        this.closeSaveModal = this.closeSaveModal.bind(this);
        this.showDetailsModal = this.showDetailsModal.bind(this);
        this.closeDetailsModal = this.closeDetailsModal.bind(this);
        this.showConfirmationModal = this.showConfirmationModal.bind(this);
        this.closeConfirmationModal = this.closeConfirmationModal.bind(this);
    }

    showSaveModal(departmentId) {
        this.props.actions.loadDepartment(departmentId)
            .then(() => {
                this.setState({saveModalVisible: true} as State);
            });
    }

    closeSaveModal() {
        this.setState({saveModalVisible: false} as State);
    }

    showDetailsModal(departmentId) {
        this.props.actions.loadDepartment(departmentId)
            .then(() => {
                this.setState({detailsModalVisible: true} as State);
            });
    }

    closeDetailsModal() {
        this.setState({detailsModalVisible: false} as State);
    }

    showConfirmationModal(departmentId) {
        this.props.actions.loadDepartment(departmentId)
            .then(() => {
                this.setState({confirmationVisible: true} as State);
            });
    }

    closeConfirmationModal() {
        this.setState({confirmationVisible: false} as State);
    }

    render() {
        return (
            <div className="container">
                <h2>Departments</h2>
                <a href="#" onClick={this.showSaveModal}>Create New</a>

                <DepartmentsList departments={this.props.departments} 
                                 onSaveClick={this.showSaveModal} 
                                 onDetailsClick={this.showDetailsModal} 
                                 onDeleteClick={this.showConfirmationModal}
                />

                <DepartmentSave visible={this.state.saveModalVisible}
                                close={this.closeSaveModal}
                />
                
                <DepartmentDetails visible={this.state.detailsModalVisible}
                                   close={this.closeDetailsModal}
                />
                
                <DepartmentDelete visible={this.state.confirmationVisible}
                                  close={this.closeConfirmationModal}
                />
            </div>
        );
    }
}

(DepartmentsPage as any).propTypes = {
    departments: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        departments: state.department.list
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: (bindActionCreators as any)(departmentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsPage);