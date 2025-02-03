import {ConfirmationOptions} from 'primevue/confirmationoptions';

export type ConfirmContainerSlotProps = {
    message: ConfirmationOptions;
    acceptCallback: () => void;
    rejectCallback: () => void;
};
