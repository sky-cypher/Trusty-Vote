import { logging, PersistentMap } from 'near-sdk-as'

const PromptArray = new PersistentMap<string, string[]>("array of prompts")
const OptionArray = new PersistentMap<string, string[]>("array of options")
const VoteArray = new PersistentMap<string, i32[]>("stores votes")
const UserParticipation = new PersistentMap<string, string[]>("user participation records")

// view methods


export function didParticipate(prompt: string, user: string): bool {
    if (UserParticipation.contains(prompt)) {
        let getArray = UserParticipation.getSome(prompt)
        return getArray.includes(user)
    } else {
        logging.log("participation prompt not found")
        return false
    }
}


export function getAllPrompts(): string[] {
    if (PromptArray.contains("AllArrays")) {
        return PromptArray.getSome("AllArrays")
    } else {
        logging.log("no prompts found")
        return []
    }
}

export function getOptions(prompt: string): string[] {
    if (OptionArray.contains(prompt)) {
        return OptionArray.getSome(prompt)
    } else {
        logging.log("options prompt not found")
        return []
    }
}


export function getVotes(prompt: string): i32[] {
    if (VoteArray.contains(prompt)) {
        return VoteArray.getSome(prompt)
    } else {
        logging.log("no votes found for this prompt")
        let options = OptionArray.getSome(prompt)
        return new Array<i32>(options.length).fill(0)
    }
}

// change methods


export function addPrompt(prompt: string): void {
    logging.log("Added to prompt array")
    if (PromptArray.contains("AllArrays")) {
        let tempArray = PromptArray.getSome("AllArrays")
        tempArray.push(prompt)
        PromptArray.set("AllArrays", tempArray)
    } else {
        PromptArray.set("AllArrays", [prompt]);
    }
}


export function addOptionArray(prompt: string, options: string[]): void {
    OptionArray.set(prompt, options)
}

export function addVote(prompt: string, index: i32): void {
    if (VoteArray.contains(prompt)) {
        let tempArray = VoteArray.getSome(prompt)
        let tempVal = tempArray[index]
        let newVal = tempVal + 1;
        tempArray[index] = newVal
        VoteArray.set(prompt, tempArray)
    } else {
        let options = OptionArray.getSome(prompt)
        let newArray = new Array<i32>(options.length).fill(0)
        newArray[index] = 1;
        VoteArray.set(prompt, newArray)
    }
}

export function recordUser(prompt: string, user: string): void {
    if (UserParticipation.contains(prompt)) {
        let tempArray = UserParticipation.getSome(prompt)
        tempArray.push(user)
        UserParticipation.set(prompt, tempArray)
    } else {
        let tempArray = new Array<string>(1).fill(user)
        UserParticipation.set(prompt, tempArray);
    }
}
