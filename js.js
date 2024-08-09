const generateHistoryItems = () => {
	const history = []
	const titles = [
		"How far the sun is",
		"What is the capital of France",
		"The meaning of life",
		"Best programming language",
		"Favorite food",
		"Dream vacation",
		"Why is the sky blue",
		"How many planets are there",
		"The tallest mountain",
		"The deepest ocean",
	]

	titles.map((title) => {
		history.push({
			title: title,
			timestamp: new Date(
				Date.now() -
					Math.floor(
						Math.random() * (Math.floor(4) - Math.ceil(0)) + Math.ceil(0)
					) *
						24 *
						60 *
						60 *
						1000
			).valueOf(),
		})
	})

	return history
}

const rawHistory = generateHistoryItems()

function categorizeHistory() {
	const today = new Date()
	const startOfWeek = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() - today.getDay()
	)
	const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

	const categorizedHistory = {
		today: [],
		thisWeek: [],
		lastMonth: [],
		other: [],
	}

	rawHistory.forEach((item) => {
		const timestamp = new Date(item.timestamp)

		if (timestamp.toDateString() === today.toDateString()) {
			categorizedHistory.today.push(item)
		} else if (timestamp.getTime() >= startOfWeek.getTime()) {
			categorizedHistory.thisWeek.push(item)
		} else if (timestamp.getTime() >= startOfMonth.getTime()) {
			categorizedHistory.lastMonth.push(item)
		} else {
			categorizedHistory.other.push(item)
		}
	})

	return categorizedHistory
}

const ChatHistory = categorizeHistory()
console.log(ChatHistory)

const today = document.querySelector("#todayHistory")
const week = document.querySelector("#weekHistory")
const month = document.querySelector("#monthHistory")
const old = document.querySelector("#oldHistory")

const PopulateHistory = () => {
	const icon = `<svg
									width="20"
									height="20"
									viewBox="0 0 18 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M10.5 6.75C10.5 7.14782 10.342 7.52935 10.0607 7.81066C9.77939 8.09196 9.39786 8.25 9.00003 8.25H4.50003L1.50003 11.25V3C1.50003 2.175 2.17503 1.5 3.00003 1.5H9.00003C9.39786 1.5 9.77939 1.65804 10.0607 1.93934C10.342 2.22064 10.5 2.60218 10.5 3V6.75Z"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round" />
									<path
										d="M13.5 6.75H15C15.3979 6.75 15.7794 6.90804 16.0607 7.18934C16.342 7.47064 16.5 7.85218 16.5 8.25V16.5L13.5 13.5H9.00003C8.60221 13.5 8.22068 13.342 7.93937 13.0607C7.65807 12.7794 7.50003 12.3978 7.50003 12V11.25"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round" />
								</svg>`

	const appandmessage = (title) => {
		const element = document.createElement("div")
		element.classList.add(
			"d-flex",
			"align-items-center",
			"bg-light",
			"rounded-pill",
			"py-2",
			"px-3",
			"mb-2"
		)
		element.innerHTML += icon

		const textDiv = document.createElement("div")
		textDiv.classList.add("flex-grow-1", "ms-2", "text-truncate")
		textDiv.textContent = title

		element.appendChild(textDiv)

		return element
	}

	ChatHistory.today.forEach((item) => {
		const element = appandmessage(item.title)

		today.appendChild(element)
	})
	ChatHistory.thisWeek.forEach((item) => {
		const element = appandmessage(item.title)

		week.appendChild(element)
	})
	ChatHistory.lastMonth.forEach((item) => {
		const element = appandmessage(item.title)

		month.appendChild(element)
	})
	ChatHistory.other.forEach((item) => {
		const element = appandmessage(item.title)

		old.appendChild(element)
	})
}

PopulateHistory()
