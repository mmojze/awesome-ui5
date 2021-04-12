import {
    BaseODataModel, BigNumber, ODataModel,
    ODataNavigation, OptionalProperty, UUIDKeyProperty, withEntitySetName
} from '@odata/server';
import { Provider } from './Provider';

// indicate the entity set name for entity
@withEntitySetName('Proposals')
@ODataModel()
export class Proposal extends BaseODataModel {

    @UUIDKeyProperty()
    id!: string;

    @OptionalProperty({ charset: "Utf8", length: 72 })
    name: string | undefined;

    @OptionalProperty({ enumValues: ["high", "medium-high", "medium", "medium-low", "low"] })
    voltage_level: string | undefined;

    @OptionalProperty({ enumValues: ["blank", "profiles", "controlled", "time-series"] })
    consumer_profile: string | undefined;

    @OptionalProperty({ type: "decimal", precision: 12, scale: 2 })
    energy_fee: BigNumber = new BigNumber(0);

    @OptionalProperty({ type: "boolean", default: false })
    funds: boolean = false;

    @OptionalProperty({ type: "boolean", default: false })
    nogaranty: boolean = false;

    @OptionalProperty({ type: "boolean", default: false })
    garanty: boolean = false;

    @OptionalProperty({ type: "boolean", default: false })
    discounts: boolean = false;

    @OptionalProperty({ type: "boolean", default: false })
    green: boolean = false;

    @OptionalProperty({ type: "boolean", default: false })
    domastic: boolean = false;

    @OptionalProperty({ type: "boolean", default: false })
    loyalty: boolean = false;

    @OptionalProperty({ type: "boolean", default: false })
    online: boolean = false;

    @OptionalProperty({ type: "boolean", default: false })
    yearly: boolean = false;

    @OptionalProperty({ type: "boolean", default: false })
    co2: boolean = false;

    @OptionalProperty({ type: "date" })
    start_date!: string;

    @OptionalProperty({ type: "date" })
    end_date!: string;

    @OptionalProperty({ default: true })
    isPublic: boolean = false;

    @OptionalProperty({ type: "uuid" })
    providerId!: string;

    @ODataNavigation({ type: 'ManyToOne', entity: () => Provider, foreignKey: 'providerId' })
    provider: Provider = new Provider;

}