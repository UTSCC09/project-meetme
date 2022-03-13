import startOfDay from "date-fns/startOfDay";
import { eventCreationRules } from "../validators/eventValidator";

const createEvent = async (
    parent,
    { title, description, location, startDate, endDate, timeslotLength },
    { models, user }
) => {
    try {
        await eventCreationRules.validate(
            {
                title,
                description,
                timeslotLength,
                location,
                startDate,
                endDate,
            },
            { abortEarly: false }
        );
    } catch (err) {
        return err;
    }

    try {
        const event = await models.Event.create({
            title,
            description,
            location,
            ownerId: user._id,
            startDate,
            endDate,
            timeslotLength,
        });
        await event.populate("ownerId");
        return event;
    } catch (err) {
        return err;
    }
};

const eventResolvers = {
    Query: {
        event: async (parent, { id }, { models }) =>
            models.Event.findOne({ id }).populate("ownerId"),
    },

    Mutation: {
        createEvent,
    },
};
export default eventResolvers;
