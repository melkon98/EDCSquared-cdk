## EDC squared

## setup project
1. install aws cli and setup aws user credential
2. install aws amplify cli
3. install node v 16 or above
4. install pnpm (npm i -g pnpm)
5. pull repo (default developing branch has name develop)
6. pnpm i
7. on amplify console (aws ui)

-> choose your app (example: edcsquared) 
-> environment (example: master)
-> Backend environments 
-> Local setup instructions (make steps)


# Lambdas environment variables

Lambdas used hardcoded variables in cloudformation file
(example: amplify/backend/function/linkTiktokAccount/linkTiktokAccount-cloudformation-template.json). 
Better solution is store in AWS SMM or Amplify variables. 
But unfortunately we got this flow, and don't have time to fix it.
So you have to change all lambdas variables when change amplify env.   