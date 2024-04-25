# tricky-tech-interview

give it a try => [BURNOUT](https://tricky-tech-interview.vercel.app/)

## About

This is my take to the technical test at Tricky.

I chose the subject 2 (Game on the prevention theme) about burnout.
The goal was to symbolize a worker overflown with tasks by creating a Space Invaders like game.
To tacle the tasks you would shoot `work loads` at them, earning you a `salary`. Some of theme (white ones) where valued at 0 and would block you in your work. To remove them, you would have to shoot at specifications (round items).
Each colored tasks you let pass by you would cost you a `vacation day` (life) and after 4 you go burnout...

## Tech Stack

I've chose to use `Nextjs` as a frontend framework to match the instructions of using `react`. It also provide a hands-on router which is not negligible. I've also use `react-three-fiber` as the lib to create the game, and `TailwindCSS` as the design system. To manage my application's state I've used `zustand`since it's robust, easy to setup and light weight compared to `Redux`.

On the backend point of view I've chose to work with `Fastity` and to serve endpoints as a REST API.

Finally I used `jest` as a testing framework and `Testing Library` for the integration ones.

## CI / CD

To manage my CI/ CD I have opted to let `Vercel` manage it by setting up webhooks on my deployments.

## Thanks

If you read this far thank you. I really enjoyed this test and I hope it will match the team expectations !
