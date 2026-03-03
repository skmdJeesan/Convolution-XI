export const getFriendlyEventName = (eventName: string): string => {
    const names: { [key: string]: string } = {
        sparkhack: "SparkHack",
        decisia: "Decisia",
        aboltabol: "Abol Tabol",
        circuistics: "Circuistics",
        eureka: "Eureka",
        inquizzitive: "Inquizzitive",
        algomaniac: "Algomaniac",
        jutalks: "JuTalks",
        frames: "24Frames",
        "24frames": "24Frames"
    };

    return names[eventName.toLowerCase().trim()] || eventName;
};
