import { bodyInput } from "../utils/reducer"
import { Input } from "@codegouvfr/react-dsfr/Input";
import useAutocomplete from '@mui/material/useAutocomplete';
import { useState } from "react";
import { alerts } from "../constants/inputAlert";

export default function UseAutocomplete(props) {

	const	{ state, target, dispatch } = props;
	const	[val, setVal] = useState('');
	const	[isDisable, setIsDisable] = useState(true);

	const	{
		getRootProps,
		getInputLabelProps,
		getInputProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
	} = useAutocomplete({
		options: state.institutions,
		getOptionLabel: (option) => option,
		onInputChange: (e, value) => {
			const	choosenVal = e.type === 'click' ? value : e.target.value;

			setVal(choosenVal);
			dispatch({ type: 'SET_USER_INSTITUTION', nextInstitution: choosenVal });

			if (!groupedOptions.includes(choosenVal)) {
				setIsDisable(true);
				return dispatch({ type: 'INSTITUTION_NOT_FOUND' });
			}
	
			setIsDisable(false);
			return dispatch({ type: 'INSTITUTION_FOUND' });
		},
	});
  
	return (
		<>
			<Input
				style={{marginBottom: 0}}
				{...getRootProps()}
				label={target.value}
				name={target.name}
				hintText="Optionnel"
				nativeInputProps={{
					...getInputLabelProps(),
					...getInputProps(),
					name: target.name,
					value: val,
					style:{backgroundColor: "#E3E3FD"},
				}}
			/>
		{groupedOptions.length > 0 ? (
			<ul style={{ backgroundColor: '#FFF', overflowY: 'auto', maxHeight: '200px'}} {...getListboxProps()}>
				{(groupedOptions).map((option, index) => (
			  		<li style={{fontSize: '16px', display: 'flex', minHeight: '24px', padding: '10px 24px', alignItems: 'center', border: '1px solid #E3E3FD'}} key={index} {...getOptionProps({ option, index })}>{option}</li>
				))}
			</ul>
		) :
		!val || !isDisable?
			null
			:
			alerts.map((alert, index) => <div style={{paddingTop: '10px'}} key={index}>{alert}</div>)
	  	}
		</>
	);
}

export const	manageFields = (target, field, props) => {

	const	{ state, dispatch } = props;

	const	newField = target.name === "title" ? <Input
		label={target.value}
		hintText="Optionnel"
		name={target.name}
		nativeInputProps={{
			name: target.name,
			style:{backgroundColor: "#E3E3FD"},
		}}
	/> :
	<UseAutocomplete
		label={target.value}
		hintText="Optionnel"
		name={target.name}
		state={state}
		dispatch={dispatch}
		target={target}
	/>

	const	updatedUserFields = state.userFields.filter((userField) => userField.props.name !== newField.props.name);
	
	state.question[target.name] = "";
	target.checked ? state.userFields.push(newField) : state.userFields = updatedUserFields;
	
	return dispatch({ type: 'ADD_USER_NEW_FIELD', nextUserField: { value: field.value, isChecked: target.checked, }});
}

export const	uncheckAllFields = (state) => {

	state.availableFields.map((field) => field.isChecked = false);
	
	return state.userFields = [bodyInput];
}

export const	setFieldCheck = (state, needle) => {

	return state.availableFields.map((field) => {
		if (field.title === needle)
			field.isChecked = true;
	});
}