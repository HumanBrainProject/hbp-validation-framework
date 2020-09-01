import React from 'react';

import styled from 'styled-components';
export const Switch = styled.div`
  position: relative;
  height: 40px;
  width: 600px;
  background-color: #e4e4e4;
  border-radius: 3px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
`;

export const SwitchRadio = styled.input`
  display: none;
`;

export const SwitchSelection = styled.span`
  display: block;
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
  width: 200px;
  height: 40px;
  background: #216BA5;
  border-radius: 3px;
  transition: left 0.25s ease-out;
`;

export const SwitchLabel = styled.label`
  position: relative;
  z-index: 2;
  float: left;
  width: 200px;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  cursor: pointer;

  ${SwitchRadio}:checked + &{
    transition: 0.15s ease-out;
    color: #fff;
  }
`;


const titleCase = str =>
	str.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');

const ClickableLabel = ({ title, onChange, id }) =>
	<SwitchLabel onClick={() => onChange(title)} className={id}>
		{titleCase(title)}
	</SwitchLabel>;

const ConcealedRadio = ({ value, selected }) =>
	<SwitchRadio type="radio" name="switch" checked={selected === value} onChange={() => { }} />;

export default class ThreeWaySwitch extends React.Component {
	state = { selected: this.props.selected };

	handleChange = val => {
		this.setState({ selected: val });
		this.props.onChange(val);
	};

	selectionStyle = () => {
		return {
			left: `${this.props.values.indexOf(this.state.selected) / 3 * 100}%`,
		};
	};

	render() {
		const { selected } = this.state;
		return (
			<Switch>
				{this.props.values.map(val => {
					return (
						<span key={val}>
							<ConcealedRadio value={val} selected={selected} />
							<ClickableLabel title={val} onChange={this.handleChange} />
						</span>
					);
				})}
				<SwitchSelection style={this.selectionStyle()} />
			</Switch>
		);
	}
}