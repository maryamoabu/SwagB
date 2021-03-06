/// <reference path="../../../../typings/angular2-meteor.d.ts" />
/// <reference path="../../../../typings/meteor-accounts-ui.d.ts" />

import {Component, View} from 'angular2/angular2';

import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/angular2';

import {Parties} from 'collections/parties';

import {AccountsUI} from 'meteor-accounts-ui';

@Component({
    selector: 'parties-form'
})
@View({
    templateUrl: 'client/components/parties/parties-form/parties-starties-fireform.html',
    directives: [FORM_DIRECTIVES, AccountsUI]
})
export class PartiesForm {
    partiesForm: ControlGroup;

    constructor() {
        var fb = new FormBuilder();
        this.partiesForm = fb.group({
            name: ['', Validators.required],
            description: [''],
            location: ['', Validators.required],
            public: [false]
        });
    }

    addParty(party) {
        if (this.partiesForm.valid) {
            if (Meteor.userId()) {
                Parties.insert({
                    name: party.name,
                    description: party.description,
                    location: party.location,
                    public: party.public,
                    owner: Meteor.userId()
                });

                (<Control>this.partiesForm.controls['name']).updateValue('');
                (<Control>this.partiesForm.controls['description']).updateValue('');
                (<Control>this.partiesForm.controls['location']).updateValue('');
                (<Control>this.partiesForm.controls['public']).updateValue(false);
            } else {
                alert('Please log in to add a party');
            }
        }
    }
}
