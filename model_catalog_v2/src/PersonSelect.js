import React from 'react';
import ChipInput from 'material-ui-chip-input';

function parseName(fullName) {
    let givenName, familyName;
    console.log("fullName = " + fullName);
    [familyName, givenName] = fullName.split(",", 2);
    console.log("familyName = " + familyName + " givenName = " + givenName);
    return {
        given_name: givenName.trim(),
        family_name: familyName.trim()
    }
}


function formatNames(nameList) {
    console.log("nameList = ");
    console.log(nameList);
    let formattedNames = nameList.map(function(obj) {
        let nameStr = obj.family_name + ", " + obj.given_name;
        return nameStr;
    });
    console.log("formattedNames = ");
    console.log(formattedNames);
    return formattedNames;
}


export default class PersonSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false
        }
        this.handleAddPerson = this.handleAddPerson.bind(this);
        this.handleRemovePerson = this.handleRemovePerson.bind(this);
        this.validateEntry = this.validateEntry.bind(this);
    }

    handleAddPerson(chip) {
        let personList = this.props.value;
        personList.push( parseName(chip) );
        this.props.onChange({
            target: {
                name: this.props.name,
                value: personList
            }
        });
    };

    handleRemovePerson(chip, index) {
        let personList = this.props.value;
        personList.splice(index, 1);
        this.props.onChange({
            target: {
                name: this.props.name,
                value: personList
            }
        });
    };

    validateEntry(chip) {
        if (chip.length == 0 || chip.split(",").length == 2) {
            this.setState({error: false});
            return true;
        } else {
            this.setState({error: true});
            return false;
        }
    };

    render() {
        this.input  = (
            <ChipInput id={this.props.id} name={this.props.name} label={this.props.label}
                    onAdd={this.handleAddPerson} onDelete={this.handleRemovePerson}
                    onBeforeAdd={this.validateEntry} error={this.state.error}
                    value={formatNames(this.props.value)} variant={this.props.variant} fullWidth={this.props.fullWidth}
                    helperText={this.props.helperText} />
      );
      return this.input;
    }
}