export enum Visibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    UNLISTED = "UNLISTED"
}

export enum City {
    KARACHI = "KARACHI"
}

export enum ConsigmentType {
    LOCAL = "LOCAL",
    DOMESTIC = "DOMESTIC",
    INTERNATIONAL = "INTERNATIONAL"
}

export enum ConsigmentDelivery {
    SAME_DAY = "SAME_DAY",
    NEXT_DAY = "NEXT_DAY",
    OVERNIGHT = "OVERNIGHTz"
}

export enum ConsigmentStatuses {
    RECEIVED_FOR_DEVLIVERY = "RECEIVED_FOR_DEVLIVERY",
    PROCESS_FOR_DELIVERY = "PROCESS_FOR_DELIVERY",

    ON_HOLD = "ON_HOLD",
    ON_HOLD_BY_CLIENT = "ON_HOLD_BY_CLIENT",
    ON_HOLD_BY_FACULTY = "ON_HOLD_BY_FACULTY",

    ARRIVED_AT_WAREHOUSE_FOR_DELIVERY = "ARRIVED_AT_WAREHOUSE_FOR_DELIVERY",
    ASSIGNED_TO_A_DELIVERY_RIDER = "ASSIGNED_TO_A_DELIVERY_RIDER",
    OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
    DELIVERED = "DELIVERED",

    NOT_DELIVERED_DUE_TO_WEATHER_ISSUE_IN_CITY = "NOT_DELIVERED_DUE_TO_WEATHER_ISSUE_IN_CITY",
    NOT_DELIVERED_DUE_TO_CLIENT_NOT_AVALIBILITY = "NOT_DELIVERED_DUE_TO_CLIENT_NOT_AVALIBILITY",
    NOT_DELIVERED_DUE_TO_RIDER_VEHICLE_ISSUE = "NOT_DELIVERED_DUE_TO_RIDER_VEHICLE_ISSUE",
    NOT_DELIVER_DUE_TO_RIDER_ACCIDENTIAL_ISSUE = "NOT_DELIVER_DUE_TO_RIDER_ACCIDENTIAL_ISSUE",
    NOT_DELIVERED = "NOT_DELIVERED",

    OTHER = "OTHER"
}