task1 = Task.create(title: 'Make Coffee', description: 'Time to make some coffee!')
task2 = Task.create(title: 'Feed the cats', description: 'Cats are hungry!')
task3 = Task.create(title: 'Make Lunch', description: "I'm hungry!")

Item.create(text: '1. Put clean filter inside the coffee maker.', complete: false, task_id: task1.id)
Item.create(text: '2. Place the coffee beans inside the filter.', complete: false, task_id: task1.id)
Item.create(text: '3. Add water to the coffee maker.', complete: false, task_id: task1.id)
Item.create(text: '4. Turn on the coffee maker and wait for black gold.', complete: false, task_id: task1.id)

Item.create(text: '1. Get a new can of cat food and open it.', complete: false, task_id: task2.id)
Item.create(text: '2. Get the spoon and place the food onto the plate', complete: false, task_id: task2.id)

Item.create(text: '1. Get a new plate and place down two tortillas', complete: false, task_id: task3.id)
Item.create(text: '2. Get the cheese from the friege and place it inside the tortillas', complete: false, task_id: task3.id)
Item.create(text: '3. Place the tortillas inside the microwave for 3 mins', complete: false, task_id: task3.id)


