import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FormCheck, FormLabel, Row } from 'react-bootstrap';
import FormSelect from '../Components/FormSelect';
import * as yup from 'yup';

import Section from '../Components/Section';

import { AppContext } from '../Contexts/AppContext';
import { AddonPropTypes } from '../Pages/AddonsConfigPage';
import { ZUIKI_MODES } from '../Data/Addons';

export const gamepadUSBHostScheme = {
	GamepadUSBHostAddonEnabled: yup
		.number()
		.required()
		.label('Gamepad USB Host Add-On Enabled'),
	GamepadUSBHostAddonZuikiMode: yup
		.number()
		.required()
		.label('Zuiki mode')
		.validateSelectionWhenValue(
			'GamepadUSBHostAddonEnabled',
			ZUIKI_MODES,
		),
};

export const gamepadUSBHostState = {
	GamepadUSBHostAddonEnabled: 0,
	GamepadUSBHostAddonZuikiMode: 0,
};

const GamepadUSBHost = ({ values, errors, handleChange, handleCheckbox }: AddonPropTypes) => {
	const { t } = useTranslation();
	const { getAvailablePeripherals } = useContext(AppContext);
	return (
		<Section title={
			<a
				href="https://gp2040-ce.info/add-ons/gamepad-usb-host"
				target="_blank"
				className="text-reset text-decoration-none"
			>
				{'Gamepad USB Host Addon'}
			</a>
		}
		>
			<div id="GamepadUSBHostOptions" hidden={!values.GamepadUSBHostAddonEnabled}>
				<div className="alert alert-info" role="alert">
					Currently incompatible with Keyboard/Mouse Host addon.
				</div>

				<Row className="mb-3">
					<FormSelect
						label={t('AddonsConfig:usb-host-zuiki-mode-label')}
						name="GamepadUSBHostAddonZuikiMode"
						className="form-select-sm"
						groupClassName="col-sm-3 mb-3"
						value={values.GamepadUSBHostAddonZuikiMode}
						error={errors.GamepadUSBHostAddonZuikiMode}
						isInvalid={Boolean(errors.GamepadUSBHostAddonZuikiMode)}
						onChange={handleChange}
					>
						{ZUIKI_MODES.map((o, i) => (
							<option
								key={`button-GamepadUSBHostAddonZuikiMode-option-${i}`}
								value={o.value}
							>
								{t(`AddonsConfig:usb-host-zuiki-mode-${i}`)}
							</option>
						))}
					</FormSelect>
				</Row>
			</div>
			{getAvailablePeripherals('usb') ? (
					<FormCheck
						label="Enabled"
						type="switch"
						id="GamepadUSBHostAddonButton"
						reverse
						isInvalid={false}
						checked={Boolean(values.GamepadUSBHostAddonEnabled)}
						onChange={(e) => {
							handleCheckbox('GamepadUSBHostAddonEnabled');
							handleChange(e);
						}}
					/>
				) : (
					<FormLabel>USB host not enabled!</FormLabel>
				)}
		</Section>
	);
};

export default GamepadUSBHost;
