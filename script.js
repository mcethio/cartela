    
        const callNumberButton = document.getElementById('call-number-button');
     const nextNumberButton = document.getElementById('next-number-button');  
       
        const resetButton = document.getElementById('reset-button');
        const calledNumbersContainer = document.getElementById('calledNumbers');
        const cartelaNumberInput = document.getElementById('cartela-number');
        const checkWinnerButton = document.getElementById('check-winner-button');
        const orderButton = document.getElementById('order-button');
        const orderCartelaInput = document.getElementById('order-cartela-id');
       const responseMessage = document.getElementById("responseMessage");
       
        const bingoCardsContainer = document.getElementById('bingo-cards-container');
        const currentGameStats = document.getElementById('currentGameStats');
        const playedCartelasCount = document.getElementById('playedCartelasCount');
        const winnerAmountDisplay = document.getElementById('winnerAmount');
        const businessmanEarningsDisplay = document.getElementById('businessmanEarnings');
        const dailyEarningsDisplay = document.getElementById('dailyEarnings');



   // Balance modal elements
        const balanceModal = document.getElementById('balanceModal');
        const balanceTodayEarnings = document.getElementById('balanceTodayEarnings');
        const balanceMonthlyEarnings = document.getElementById('balanceMonthlyEarnings');
        const balanceTotalDisplayedCartelas = document.getElementById('balanceTotalDisplayedCartelas');
        const closeButton = document.getElementById('closeButton');
        const balanceButton = document.getElementById('balance-button');
     const limitSelect = document.getElementById('cartela-limit');
        const unlockButton = document.getElementById('unlock-limit-button');
        const setLimitButton = document.getElementById('set-cartela-limit-button');
        const passwordInput = document.getElementById('limit-password');

        const defaultCartelaLimit = 5; // Default value
        let cartelaLimit = localStorage.getItem('cartelaLimit') ? parseInt(localStorage.getItem('cartelaLimit')) : defaultCartelaLimit;
        limitSelect.value = cartelaLimit; // Set dropdown value on page load


        let calledNumbers = [];
        let intervalId 
        let isAutoPlaying = false;
    let autoPlayInterval = 2500; // Default interval for calling numbers
    
    
   
   
   let totalWinnerAmount = 0; // Total winner amount to accumulate
let currentGameEarnings = 0; // Current game earnings
let bonusClaimed = false; // Flag to track if bonus has been claimed

   
 
// Assume initial winnerAmount is set appropriately
// (this is usually calculated based on the current game display)
let winnerAmount;
    
    

function updateCallingSpeedDisplay(value) {
    autoPlayInterval = parseInt(value, 10); // Update the autoPlayInterval variable
    const seconds = autoPlayInterval / 500; // Convert milliseconds to seconds
    document.getElementById('calling-speed-display').textContent = `${seconds} seconds`;
    
    if (isAutoPlaying) { // Restart the interval if the game is currently auto-playing
        clearInterval(intervalId);
        startAutoPlay();
    }
}

// Modify the startAutoPlay function to use variable interval
function startAutoPlay() {
    if (isAutoPlaying) {
        clearInterval(intervalId);
        isAutoPlaying = false;
        callNumberButton.textContent = 'Start Game';
    } else {
        isAutoPlaying = true;
        intervalId = setInterval(callNumber, autoPlayInterval);
        callNumberButton.textContent = 'Stop Game';
    }
}
       let monthlyStats = []; // To hold      monthly stats 
        

        let displayedCartelas = new Set(); // Track displayed cartelas for the current session
        let totalDisplayedCartelas = parseInt(localStorage.getItem('totalDisplayedCartelas')) || 0; // Load or initialize total displayed cartelas
        let currentGameDisplayedCartelas = 0; // Track displayed cartelas for the current game session
        let calledNumbersCount = 0; // Keep track of the number of called numbers
        const maxAllowedRemovals = 5; // Maximum number of allowed calls before removal isdisabled 
        
 
       let dailyEarnings = parseInt(localStorage.getItem('dailyEarnings')) || 0;

        let lastRecordedDate = localStorage.getItem('lastRecordedDate') || new Date().toISOString().split('T')[0];

        // Check if we need to reset daily earnings based on today's date
        const today = new Date().toISOString().split('T')[0];
        if (today !== lastRecordedDate) {
            dailyEarnings = 0; // Reset daily earnings
            lastRecordedDate = today; // Update to today's date
            localStorage.setItem('lastRecordedDate', lastRecordedDate); // Store new date
        }

     
        dailyEarningsDisplay.textContent = `Today's Earnings: ${dailyEarnings} Birr`;
       let selectedBetAmount = 0;
        let businessmanEarnings = parseInt(localStorage.getItem('businessmanEarnings')) || 0;

        businessmanEarningsDisplay.textContent = `Businessman's Total Earnings This Month: ${businessmanEarnings} Birr`;
        
        
      function setBetAmount(amount) {
            selectedBetAmount = parseInt(amount, 10);
            let winnerAmount;
            let businessEarnings;

            if (currentGameDisplayedCartelas <= 0) {
                winnerAmount = selectedBetAmount * 0.9; // 90% goes to the winner
                businessEarnings = selectedBetAmount * 0.1; // 10% goes to the businessman
            } else {
                winnerAmount = selectedBetAmount * 0.8; // 80% goes to the winner
                businessEarnings = selectedBetAmount * 0.2; // 20% goes to the businessman
            }
            winnerAmountDisplay.textContent = `Winner Amount: ${winnerAmount * currentGameDisplayedCartelas} Birr`;

            // Update Businessman's earnings
            businessmanEarnings += businessEarnings * currentGameDisplayedCartelas;
            dailyEarnings += businessEarnings * currentGameDisplayedCartelas; // Update today's earnings
            localStorage.setItem('businessmanEarnings', businessmanEarnings); // Save updated earnings
            localStorage.setItem('dailyEarnings', dailyEarnings); // Save today's earnings
            businessmanEarningsDisplay.textContent = `Businessman's Total Earnings This Month: ${businessmanEarnings} Birr`;
            dailyEarningsDisplay.textContent = `Today's Earnings: ${dailyEarnings} Birr`;

            callNumberButton.disabled = false; // Enable the Start Game button
        }
          function showResponse(message, type) {
            // Set message text and style based on type
            responseMessage.textContent = message;
            responseMessage.className = "response " + (type === "success" ? "success" : "error");
            responseMessage.style.display = "block"; // Show the response message

            // Automatically hide the message after a few seconds
            setTimeout(() => {
                responseMessage.style.display = "none"; // Hide message after timeout
            }, 4000); // Adjust the time (in milliseconds) here
        }

        
 
        function resetCurrentGameCartelasCount() {
            currentGameDisplayedCartelas = 0;
            currentGameStats.textContent = `Displayed Cartelas for Current Game: ${currentGameDisplayedCartelas}`;
        }
    

        let cartelaCards = {
            1: [13, 28, 39, 60, 69, 9, 26, 37, 48, 74, 4, 17, 'FREE', 59, 68, 3, 16, 45, 47, 70, 2, 21, 40, 58, 65],
            2: [9, 16, 37, 52, 70, 10, 29, 32, 49, 68, 15, 18, 'FREE', 55, 61, 2, 30, 33, 58, 69, 1, 20, 42, 54, 62],
            3: [14, 21, 40, 47, 61, 2, 23, 37, 58, 74, 1, 30, 'FREE', 49, 67, 4, 22, 35, 48, 65, 10, 27, 41, 46, 63],
            4: [5, 25, 40, 57, 69, 6, 23, 32, 47, 72, 4, 24, 'FREE', 60, 63, 8, 30, 33, 56, 62, 9, 18, 34, 53, 73],
            5: [6, 27, 41, 46, 69, 10, 22, 45, 60, 74, 8, 16, 'FREE', 59, 63, 14, 17, 40, 50, 62, 3, 26, 33, 52, 65],
            6: [12, 20, 35, 59, 72, 8, 25, 43, 60, 63, 3, 28, 'FREE', 53, 64, 7, 24, 38, 55, 67, 13, 29, 32, 46, 68],
            7: [15, 23, 42, 58, 75, 4, 18, 43, 55, 68, 11, 26, 'FREE', 52, 66, 14, 16, 33, 49, 61, 6, 29, 41, 56, 63],
            8: [11, 17, 42, 47, 65, 5, 23, 43, 53, 63, 1, 18, 'FREE', 57, 73, 2, 20, 39, 50, 68, 3, 16, 31, 55, 75],
            9: [8, 30, 31, 47, 61, 3, 24, 39, 54, 65, 5, 17, 'FREE', 55, 74, 15, 28, 43, 52, 71, 14, 18, 32, 50, 75],
            10: [3, 30, 44, 50, 70, 5, 17, 34, 51, 67, 9, 27, 'FREE', 56, 75, 1, 16, 43, 47, 66, 8, 25, 33, 58, 65],
            11: [3, 28, 32, 53, 75, 5, 23, 35, 56, 71, 9, 16, 'FREE', 48, 67, 6, 18, 37, 57, 73, 10, 22, 39, 47, 68],
            12: [13, 25, 42, 52, 64, 7, 24, 34, 46, 71, 11, 30, 'FREE', 56, 63, 4, 16, 33, 57, 68, 8, 19, 40, 59, 72],
            13: [3, 27, 45, 47, 74, 15, 26, 31, 57, 61, 1, 17, 'FREE', 59, 71, 2, 30, 43, 55, 69, 12, 18, 32, 46, 75],
            14: [7, 26, 40, 48, 73, 10, 21, 37, 60, 68, 3, 16, 'FREE', 55, 66, 15, 25, 39, 57, 64, 14, 27, 34, 50, 72],
            15: [3, 28, 35, 50, 71, 8, 23, 45, 47, 72, 2, 26, 'FREE', 56, 73, 4, 24, 32, 54, 63, 9, 27, 38, 46, 75],
            16: [8, 23, 35, 60, 63, 10, 20, 34, 46, 69, 9, 19, 'FREE', 54, 61, 4, 26, 42, 49, 64, 15, 18, 32, 53, 65],
            17: [3, 19, 35, 46, 66, 10, 20, 33, 60, 64, 7, 29, 'FREE', 57, 73, 13, 26, 41, 51, 74, 1, 22, 43, 58, 67],
            18: [11, 23, 45, 47, 72, 5, 22, 44, 57, 63, 9, 21, 'FREE', 58, 71, 14, 28, 32, 51, 65, 7, 20, 38, 55, 66],
            19: [13, 21, 32, 46, 75, 6, 30, 31, 48, 68, 2, 24, 'FREE', 50, 65, 10, 26, 35, 55, 62, 5, 27, 39, 49, 66],
            20: [5, 22, 45, 60, 71, 4, 28, 39, 54, 70, 12, 23, 'FREE', 50, 69, 1, 30, 34, 53, 62, 14, 17, 40, 52, 64],
            21: [14, 20, 37, 48, 71, 15, 27, 34, 55, 66, 7, 17, 'FREE', 54, 69, 3, 28, 41, 46, 72, 6, 16, 33, 50, 64],
            22: [8, 24, 39, 60, 71, 12, 29, 36, 58, 74, 4, 30, 'FREE', 50, 70, 14, 22, 34, 59, 62, 9, 16, 32, 47, 68],
            23: [3, 23, 42, 53, 69, 2, 28, 43, 60, 75, 12, 30, 'FREE', 49, 65, 1, 21, 31, 59, 63, 14, 20, 40, 46, 61],
            24: [9, 27, 40, 52, 72, 3, 16, 32, 55, 70, 2, 21, 'FREE', 54, 67, 11, 29, 45, 58, 64, 14, 30, 42, 60, 61],
            25: [9, 22, 36, 50, 64, 2, 19, 39, 60, 72, 14, 16, 'FREE', 56, 73, 13, 28, 37, 47, 61, 6, 26, 34, 58, 71],
            26: [11, 30, 31, 49, 71, 14, 20, 38, 58, 63, 8, 22, 'FREE', 51, 74, 15, 16, 36, 57, 70, 5, 25, 40, 52, 72],
            27: [11, 16, 35, 54, 65, 3, 23, 31, 59, 74, 2, 17, 'FREE', 47, 63, 10, 24, 34, 56, 66, 6, 25, 39, 53, 61],
            28: [12, 23, 37, 47, 75, 3, 28, 42, 55, 62, 6, 30, 'FREE', 57, 63, 7, 22, 32, 48, 71, 15, 17, 44, 59, 65],
            29: [11, 24, 32, 51, 73, 8, 28, 31, 56, 68, 15, 26, 'FREE', 55, 62, 13, 27, 33, 60, 67, 6, 20, 38, 58, 71],
            30: [9, 25, 35, 54, 62, 3, 26, 40, 58, 66, 11, 16, 'FREE', 57, 63, 8, 29, 33, 55, 73, 12, 21, 42, 46, 70],
            31: [6, 29, 39, 56, 61, 4, 24, 41, 48, 73, 7, 26, 'FREE', 47, 72, 10, 17, 40, 59, 62, 15, 19, 37, 60, 63],
            32: [3, 28, 34, 48, 73, 14, 16, 43, 49, 69, 15, 18, 'FREE', 57, 62, 9, 19, 41, 47, 68, 6, 26, 40, 53, 74],
            33: [2, 19, 38, 47, 61, 6, 30, 43, 60, 74, 5, 21, 'FREE', 57, 75, 9, 25, 36, 46, 67, 7, 28, 42, 48, 63],
            34: [7, 21, 43, 55, 74, 6, 16, 32, 54, 70, 12, 28, 'FREE', 56, 63, 15, 24, 38, 51, 68, 1, 30, 35, 53, 72],
            35: [14, 21, 43, 57, 62, 8, 19, 39, 53, 73, 9, 24, 'FREE', 49, 64, 7, 29, 32, 59, 74, 6, 22, 36, 46, 75],
            36: [8, 23, 39, 60, 69, 9, 28, 37, 51, 75, 13, 22, 'FREE', 48, 65, 1, 25, 31, 56, 74, 10, 29, 32, 58, 68],
            37: [1, 20, 36, 53, 68, 5, 26, 31, 49, 70, 3, 18, 'FREE', 55, 62, 8, 28, 45, 51, 74, 7, 22, 38, 60, 61],
            38: [4, 18, 39, 60, 64, 6, 17, 36, 57, 73, 10, 23, 'FREE', 48, 75, 13, 16, 44, 47, 67, 12, 25, 33, 54, 74],
            39: [10, 26, 38, 49, 61, 12, 25, 37, 55, 69, 11, 24, 'FREE', 51, 66, 2, 28, 36, 54, 71, 6, 18, 33, 56, 73],
            40 : [11, 20, 40, 51, 64, 13, 17, 41, 52, 66, 14, 24, 'FREE', 54, 70, 10, 29, 33, 60, 73, 5, 21, 34, 49, 75],
            41: [7, 18, 37, 53, 63, 13, 24, 41, 57, 70, 15, 28, 'FREE', 60, 61, 5, 23, 33, 52, 67, 1, 17, 42, 59, 65],
            42: [9, 30, 37, 53, 73, 10, 29, 34, 55, 68, 11, 26, 'FREE', 52, 67, 6, 24, 41, 49, 61, 4, 21, 36, 47, 66],
            43: [12, 17, 36, 52, 62, 5, 16, 42, 59, 61, 3, 21, 'FREE', 50, 63, 1, 26, 31, 60, 75, 15, 19, 35, 57, 64 ],
            44: [12, 26, 43, 48, 68, 2, 23, 31, 55, 63, 8, 16, 'FREE', 49, 67,14, 20, 38, 51, 75, 11, 18, 36, 53, 62],
            45: [2, 23, 39, 50, 64, 4, 29, 35, 58, 61, 7, 17, 'FREE', 59, 71, 1, 30, 40, 53, 73, 8, 28, 45, 57, 62],
            46: [7, 23, 38, 46, 68, 13, 21, 43, 51, 73, 9, 30, 'FREE', 60, 66, 5, 26, 34, 59, 70, 3, 19, 41, 50, 67],
            47: [14, 17, 33, 47, 72, 13, 28, 35, 49, 71, 5, 18, 'FREE', 52, 68, 6, 29, 42, 60, 66, 2, 23, 45, 59, 64],
            48: [13, 27, 35, 51, 74, 6, 20, 45, 53, 65, 1, 25, 'FREE', 59, 62, 5, 19, 44, 58, 69, 7, 18, 40, 54, 72],
            49: [2, 30, 33, 48, 74, 4, 18, 37, 50, 69, 5, 23, 'FREE', 47, 71, 8, 16, 42, 49, 66, 14, 20, 38, 54, 73],
            50: [7, 27, 32, 59, 72, 9, 30, 42, 49, 73, 3, 29, 'FREE', 54, 69, 14, 26, 35, 50, 74, 4, 17, 34, 47, 68],
            51: [4, 21, 34, 60, 73, 6, 17, 32, 56, 74, 8, 30, 'FREE', 57, 70, 2, 27, 40, 53, 64, 11, 22, 41, 47, 61],
            52: [7, 23, 38, 46, 68, 13, 21, 43, 51, 73, 9, 30, 'FREE', 60, 66, 5, 26, 34, 59, 70, 3, 19, 41, 50, 67],
            53: [5, 25, 38, 59, 62, 3, 24, 31, 60, 72, 8, 27, 'FREE', 47, 70, 11, 26, 37, 51, 73, 9, 18, 43, 59, 75],
            54: [11, 24, 43, 55, 74, 2, 29, 34, 51, 61, 12, 30, 'FREE', 59, 67, 14, 27, 41, 49, 72, 15, 21, 39, 60, 64],
            55: [11, 30, 38, 53, 66, 13, 21, 39, 58, 70, 14, 24, 'FREE', 60, 65, 2, 25, 45, 59, 75, 3, 27, 32, 56, 68],
            56: [5, 16, 36, 55, 66, 12, 20, 39, 49, 71, 15, 22, 'FREE', 48, 70, 2, 29, 45, 53, 72, 3, 25, 38, 59, 62],
            57: [1, 18, 42, 60, 73, 12, 22, 33, 59, 70, 4, 30, 'FREE', 51, 74, 3, 27, 38, 53, 66, 5, 25, 40, 56, 71],
            58: [12, 25, 34, 52, 73, 7, 17, 44, 58, 67, 6, 23, 'FREE', 51, 62, 2, 16, 41, 46, 74, 10, 24, 40, 59, 75],
            59: [7, 19, 32, 51, 64, 1, 17, 39, 55, 63, 6, 21, 'FREE', 57, 75, 9, 16, 45, 56, 65, 12, 25, 34, 48, 67],
            60: [7, 19, 32, 51, 64, 1, 17, 39, 55, 63, 6, 21, 'FREE', 57, 75, 9, 16, 45, 56, 65, 12, 25, 34, 48, 67],
            61: [1, 29, 38, 56, 75, 5, 19, 33, 57, 74, 7, 25, 'FREE', 50, 61, 13, 16, 35, 48, 73, 3, 17, 39, 54, 65],
            62: [11, 22, 37, 55, 67, 13, 27, 40, 57, 62, 5, 25, 'FREE', 52, 68, 1, 24, 38, 47, 65, 7, 23, 43, 49, 74],
            63: [3, 28, 34, 53, 70, 15, 26, 42, 47, 67, 10, 16, 'FREE', 50, 62, 14, 23, 40, 55, 71, 13, 27, 45, 57, 61],
            64: [4, 20, 41, 49, 65, 2, 26, 38, 56, 67, 3, 18, 'FREE', 60, 71, 6, 23, 40, 46, 64, 11, 27, 34, 50, 66],
            65: [2, 16, 42, 50, 75, 4, 26, 31, 48, 68, 3, 22, 'FREE', 54, 73, 1, 30, 33, 60, 63, 11, 28, 44, 55, 65],
            66: [9, 22, 38, 57, 61, 12, 19, 39, 55, 63, 4, 20, 'FREE', 47, 65, 8, 26, 33, 59, 70, 14, 21, 31, 48, 73],
            67: [7, 16, 44, 50, 61, 8, 22, 39, 54, 65, 15, 23, 'FREE', 53, 66, 14, 26, 32, 60, 64, 5, 30, 31, 46, 67],
            68: [3, 16, 34, 46, 69, 8, 24, 40, 60, 61, 9, 18, 'FREE', 47, 63, 4, 30, 41, 51, 75, 7, 23, 32, 52, 74],
            69: [11, 24, 38, 60, 72, 9, 29, 37, 56, 65, 14, 26, 'FREE', 59, 61, 13, 23, 31, 58, 69, 3, 22, 36, 49, 63],
            70: [4, 30, 35, 56, 72, 1, 28, 40, 50, 73, 7, 21, 'FREE', 58, 67, 11, 17, 41, 59, 62, 13, 16, 37, 52, 75],
            71: [7, 25, 37, 51, 71, 13, 24, 32, 54, 62, 5, 27, 'FREE', 47, 69, 2, 26, 43, 48, 61, 11, 21, 42, 58, 66],
            72: [12, 22, 42, 48, 65, 15, 17, 37, 46, 62, 1, 18, 'FREE', 47, 70, 10, 28, 45, 58, 72, 9, 23, 38, 57, 69],
            73: [2, 23, 43, 54, 73, 14, 26, 38, 50, 69, 6, 28, 'FREE', 59, 62, 10, 19, 42, 55, 74, 3, 22, 34, 51, 63],
            74: [6, 20, 36, 46, 75, 1, 27, 45, 56, 73, 14, 30, 'FREE', 47, 64, 15, 29, 42, 50, 69, 2, 16, 34, 55, 72],
            75: [2, 30, 45, 46, 69, 3, 17, 36, 60, 61, 11, 22, 'FREE', 59, 67, 13, 19, 35, 56, 66, 14, 18, 44, 50, 70],
            76: [6, 27, 41, 48, 69, 15, 28, 33, 50, 72, 5, 19, 'FREE', 56, 73, 13, 21, 31, 52, 65, 11, 25, 43, 60, 64],
            77: [8, 26, 32, 48, 62, 1, 19, 45, 53, 63, 3, 28, 'FREE', 55, 69, 15, 18, 37, 58, 72, 11, 16, 41, 56, 64],
            78: [13, 19, 41, 53, 71, 11, 20, 38, 52, 67, 3, 29, 'FREE', 54, 72, 12, 22, 39, 56, 73, 9, 30, 40, 47, 65],
            79: [14, 21, 33, 49, 64, 6, 22, 36, 56, 62, 1, 25, 'FREE', 47, 70, 5, 20, 43, 57, 72, 2, 16, 34, 59, 71],
            80: [13, 22, 42, 50, 74, 5, 28, 32, 58, 75, 15, 17, 'FREE', 53, 72, 1, 24, 39, 48, 61, 8, 21, 38, 47, 73],
            81: [5, 29, 45, 59, 69, 8, 17, 35, 47, 72, 1, 21, 'FREE', 55, 74, 3, 27, 36, 46, 68, 11, 20, 42, 54, 73],
            82: [10, 24, 35, 59, 70, 14, 29, 38, 48, 61, 2, 19, 'FREE', 46, 67, 11, 23, 33, 53, 71, 5, 18, 32, 52, 72],
            83: [10, 18, 38, 54, 66, 2, 30, 45, 53, 68, 7, 23, 'FREE', 56, 73, 15, 22, 32, 47, 64, 1, 28, 44, 48, 67],
            84: [9, 30, 34, 57, 73, 3, 24, 38, 48, 72, 1, 20, 'FREE', 51, 74, 6, 17, 33, 54, 69, 4, 18, 42, 53, 61],
            85: [6, 19, 42, 52, 62, 15, 29, 34, 49, 61, 7, 27, 'FREE', 54, 69, 5, 28, 41, 60, 67, 2, 25, 40, 55, 64],
            86: [7, 23, 31, 50, 72, 9, 27, 41, 52, 75, 2, 22, 'FREE', 51, 74, 13, 28, 35, 54, 64, 11, 21, 44, 56, 67],
            87: [6, 28, 32, 51, 70, 7, 27, 33, 58, 67, 11, 19, 'FREE', 53, 61, 9, 26, 44, 52, 73, 3, 22, 42, 57, 74],
            88: [12, 30, 37, 50, 64, 3, 22, 33, 58, 75, 1, 23, 'FREE', 53, 63, 6, 28, 45, 51, 65, 11, 16, 41, 49, 70],
            89: [1, 19, 32, 49, 72, 11, 27, 39, 57, 65, 13, 21, 'FREE', 55, 64, 15, 25, 34, 56, 69, 3, 22, 40, 50, 67],
            90: [5, 20, 45, 59, 62, 14, 17, 37, 47, 68, 13, 22, 'FREE', 54, 65, 8, 30, 40, 57, 67, 3, 19, 43, 55, 70],
            91: [1, 19, 33, 60, 67, 7, 18, 35, 59, 66, 9, 24, 'FREE', 56, 73, 10, 26, 36, 51, 72, 15, 17, 32, 54, 68],
            92: [4, 19, 37, 46, 72, 7, 22, 45, 51, 68, 1, 20, 'FREE', 59, 70, 12, 24, 32, 54, 67, 3, 17, 42, 47, 69],
            93: [8, 22, 32, 57, 64, 1, 28, 39, 47, 67, 6, 17, 'FREE', 50, 68, 7, 30, 35, 59, 75, 12, 21, 31, 58, 65],
            94: [15, 29, 45, 59, 71, 5, 18, 38, 46, 72, 11, 16, 'FREE', 49, 67, 8, 20, 34, 51, 61, 13, 26, 36, 53, 73],
            95: [13, 22, 45, 56, 74, 15, 30, 41, 58, 61, 5, 25, 'FREE', 47, 73, 10, 27, 37, 52, 75, 9, 16, 33, 48, 70],
            96: [6, 23, 37, 58, 74, 10, 22, 44, 55, 65, 3, 26, 'FREE', 52, 62, 2, 30, 42, 53, 63, 11, 28, 45, 54, 75],
            97: [5, 29, 32, 53, 67, 2, 21, 36, 60, 61, 13, 23, 'FREE', 48, 66, 10, 28, 45, 50, 71, 14, 19, 40, 58, 72],
            98: [4, 25, 42, 50, 69, 1, 17, 35, 57, 67, 12, 28, 'FREE', 58, 63, 7, 22, 31, 51, 75, 14, 30, 38, 59, 74],
            99: [1, 18, 40, 48, 70, 4, 21, 42, 54, 62, 8, 23, 'FREE', 59, 65, 7, 16, 36, 56, 64, 12, 25, 35, 58, 73],
            100: [14, 16, 33, 47, 66, 7, 24, 38, 60, 63, 3, 21, 'FREE', 51, 74, 10, 25, 35, 46, 67, 13, 19, 39, 50, 61],
            };

        const password = 'Fentxxxxx'; //The correct password 
        function playSound(soundId) {
            const sound = document.getElementById(soundId);
            if (sound) {
                sound.currentTime = 0; // Restart sound if still playing
                sound.play().catch(error => {
                    console.error("Error playing sound:", error);
                });
            }
        }

        function getBingoLetter(number) {
            return number >= 1 && number <= 15 ? 'B' :
                number >= 16 && number <= 30 ? 'I' :
                    number >= 31 && number <= 45 ? 'N' :
                        number >= 46 && number <= 60 ? 'G' : 'O'; // 61-75
        }
        
   
       

         function displayCalledNumbers() {
            calledNumbersContainer.innerHTML = '';
            if (calledNumbers.length > 0) {
                const firstNumberDiv = document.createElement('div');
                firstNumberDiv.classList.add('first-called');
                firstNumberDiv.textContent = getBingoLetter(calledNumbers[0]) + calledNumbers[0];
                calledNumbersContainer.appendChild(firstNumberDiv);
            }
            
            
    // Function to handle Next Called Number Button click
        nextNumberButton.onclick = function() {
            callNumber(); // Call the next number if the button is clicked
        };
        
        
        
        

        // Start the game when the main button is clicked
        callNumberButton.onclick = function() {
            resetCurrentGameCartelasCount();
            bingoCardsContainer.style.display = 'block'; // Show Bingo cards if they are hidden
            startAutoPlay(); // This starts the auto-calling mode
            nextNumberButton.disabled = false; // Enable the next number button
        };
         
            
            
            
            const remainingNumbers = calledNumbers.slice(1);
            for (let i = 0; i < remainingNumbers.length; i += 15) {
                const numberRow = document.createElement('div');
                numberRow.classList.add('called-number-row');
                const rowNumbers = remainingNumbers.slice(i, i + 15);

                rowNumbers.forEach(num => {
                    const numberDiv = document.createElement('div');
                    numberDiv.classList.add('called-number');
                    numberDiv.textContent = getBingoLetter(num) + num;
                    numberRow.appendChild(numberDiv);
                });

                calledNumbersContainer.appendChild(numberRow);
            }
        }

        let lastCalledNumber = null;

        function callNumber() {
            if (calledNumbers.length >= 75) {
                alert("All numbers have been called!");
                clearInterval(intervalId);
                return;
            }

            let newNumber;
            do {
                newNumber = Math.floor(Math.random() * 75) + 1;
            } while (calledNumbers.includes(newNumber));

            if (lastCalledNumber !== null) {
                markAllCards(lastCalledNumber, false);
            }

            calledNumbers.unshift(newNumber);
            calledNumbersCount++; // Increment the count of called numbers
            displayCalledNumbers();

            const numberSound = document.getElementById('numberSound');
            numberSound.src = `sounds/${newNumber}.m4a`;
            playSound('numberSound');

            markAllCards(newNumber, true);
            lastCalledNumber = newNumber;
        }

        function markAllCards(calledNumber, isNewCall) {
        
        
        
        
            const cardContainers = bingoCardsContainer.children;
            for (let cardContainer of cardContainers) {
                const cardNumbers = cardContainer.children;
                
                Array.from(cardNumbers).forEach((div) => {
                    if (parseInt(div.textContent) === calledNumber) {
                        if (isNewCall) {
                            div.classList.add('marked');
                            div.classList.add('blink');
                        } else {
                            div.classList.remove('blink');

                        }
                    }
                });
            }
        }

        function resetCurrentGameCartelasCount() {
            currentGameDisplayedCartelas = 0;
            currentGameStats.textContent = `Displayed Cartelas for Current Game: ${currentGameDisplayedCartelas}`;
        }
        
        
        function displayBingoCard(card, isWinner, cartelaIndex) {
            if (!displayedCartelas.has(cartelaIndex)) {
                displayedCartelas.add(cartelaIndex);
                totalDisplayedCartelas++;
                currentGameDisplayedCartelas++;

                if (currentGameDisplayedCartelas === 1) {
                    bingoCardsContainer.style.display = 'block'; // Show the bingo cards container
                }

                localStorage.setItem('totalDisplayedCartelas', totalDisplayedCartelas);
                playedCartelasCount.textContent = `Displayed Cartelas This Month: ${totalDisplayedCartelas}`;
                currentGameStats.textContent = `Displayed Cartelas for Current Game: ${currentGameDisplayedCartelas}`;
       
              
                      
  // This function will calculate the winner amount based on the number of displayed cartelas
function calculateWinnerAmount(selectedBetAmount, currentGameDisplayedCartelas) {
    if (currentGameDisplayedCartelas <= 0) {
        return selectedBetAmount * 0.9; // 90% goes to the winner
    } else {
        return selectedBetAmount * 0.8; // 80% goes to the winner
    }
}
              
     
          
       // Calculate current game earnings based on the bet amount
    let currentEarningFromCard = calculateWinnerAmount(selectedBetAmount, currentGameDisplayedCartelas);
    currentGameEarnings += currentEarningFromCard; // Update total current game earnings
    totalWinnerAmount += currentEarningFromCard; // Add to winner amount
    winnerAmountDisplay.textContent = `Winner Amount: ${totalWinnerAmount} Birr`; // Display updated winner amount

// Update remaining functionality for card display...
} 

// Balance button functionality
        balanceButton.onclick = () => {
            balanceTodayEarnings.textContent = `Today's Earnings: ${dailyEarnings} Birr`;
            balanceMonthlyEarnings.textContent = `Monthly Earnings: ${businessmanEarnings} Birr`;
            balanceTotalDisplayedCartelas.textContent = `Total Displayed Cartelas: ${totalDisplayedCartelas}`;
            balanceModal.style.display = 'block'; // Show the modal
        };

        // Close modal functionality
        closeButton.onclick = () => {
            balanceModal.style.display = 'none'; // Hide the modal
        };              
    
    

    
    
                               
     
                   
                
                
                // Update Businessman's earnings
                businessmanEarnings += (selectedBetAmount * ((currentGameDisplayedCartelas < 0) ? 0.1: 0.2)); // Deduct based on current earnings percentage
                localStorage.setItem('businessmanEarnings', businessmanEarnings); // Save updated earnings
                businessmanEarningsDisplay.textContent = `Businessman's Total Earnings This Month: ${businessmanEarnings} Birr`;

                // Update Daily Earnings
                dailyEarnings += (selectedBetAmount * ((currentGameDisplayedCartelas < 0) ? 0.1: 0.2)); // Daily earnings adjustment
                localStorage.setItem('dailyEarnings', dailyEarnings);
                dailyEarningsDisplay.textContent = `Today's Earnings: ${dailyEarnings} Birr`;
                
                const cardContainer = document.createElement('div');
                cardContainer.className = 'bingo-card' + (isWinner ? ' winning-card' : '');

                cardContainer.id = `cartela-${cartelaIndex}`; // Unique ID for the cartela
               
              const header = ['B', 'I', 'N', 'G', 'O'];
                header.forEach(letter => {
                    const headerDiv = document.createElement('div');
                    headerDiv.textContent = letter;
                    headerDiv.classList.add('header');
                    cardContainer.appendChild(headerDiv);
                });

                card.forEach(num => {
                    const numberDiv = document.createElement('div');
                    if (num === 'FREE') {
                        numberDiv.innerHTML = `<span class="free-text">${cartelaIndex}</span>`;
                        numberDiv.classList.add('free');
                    } else {
                        numberDiv.textContent = num;
                        if (calledNumbers.includes(num)) {
                            numberDiv.classList.add('marked');
                        }
                    }
                    cardContainer.appendChild(numberDiv);
                });
                
                
                 
         
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.className = 'remove-button';

                // Add event listener to remove the card
                removeButton.onclick = () => {
                    // Allow removing only before 5 numbers are called
                    if (calledNumbersCount < maxAllowedRemovals) {
                        if (!isAutoPlaying) { // Allow removing only if the game has not started
                            bingoCardsContainer.removeChild(cardContainer);
                            displayedCartelas.delete(cartelaIndex);
                            totalDisplayedCartelas--;
                            currentGameDisplayedCartelas--;
                            playedCartelasCount.textContent = `Displayed Cartelas This Month: ${totalDisplayedCartelas}`;
                          currentGameStats.textContent = `Displayed Cartelas for Current Game: ${currentGameDisplayedCartelas}`;

             // Update Businessman's earnings
                    businessmanEarnings -= (selectedBetAmount * ((currentGameDisplayedCartelas < 0) ? 0.1: 0.2)); // Deduct based on current earnings percentage
                    localStorage.setItem('businessmanEarnings', businessmanEarnings); // Save updated earnings
                    businessmanEarningsDisplay.textContent = `Businessman's Total Earnings This Month: ${businessmanEarnings} Birr`;
                    
              // Update Daily Earnings
                    dailyEarnings -= (selectedBetAmount * ((currentGameDisplayedCartelas < 0) ? 0.1: 0.2)); 
                    localStorage.setItem('dailyEarnings', dailyEarnings);
                    dailyEarningsDisplay.textContent = `Today's Earnings: ${dailyEarnings} Birr`;
                    
                    // Update Winner Amount based on displayed cartelas
                    let winnerAmount;
                    if (currentGameDisplayedCartelas <= 0) {
                        winnerAmount = selectedBetAmount * 0.9;
                    } else {
                        winnerAmount = selectedBetAmount * 0.8;
                    }

                    winnerAmountDisplay.textContent = `Winner Amount: ${winnerAmount * currentGameDisplayedCartelas} Birr`;
            
             if (currentGameDisplayedCartelas === 0) {
                bingoCardsContainer.style.display = 'none'; // Hide bingo cards if none left
            }
        } else {
         showResponse(" እባክዎ ካረቴላ ከመሰረዝዎ በፊት ጨዋታውን ያስቁሙ!");
        }
    } else {
      showResponse("የተመዘገበ ካርቴላ ጨዋታው ከጀመረ በኋላ መሰረዝ አይችሉም!");
    }
};
  
                cardContainer.appendChild(removeButton);
                bingoCardsContainer.insertBefore(cardContainer, bingoCardsContainer.firstChild);
                
     // Add the block button
        const blockButton = document.createElement('button');
        blockButton.textContent = 'Block'; // New block button
        blockButton.className = 'block-button'; // Add class for styling

        blockButton.onclick = () => {
            bingoCardsContainer.removeChild(cardContainer);
            displayedCartelas.delete(cartelaIndex);
            totalDisplayedCartelas--;
            currentGameDisplayedCartelas--;
            playedCartelasCount.textContent = `Displayed Cartelas This Month: ${totalDisplayedCartelas}`;
            currentGameStats.textContent = `Displayed Cartelas for Current Game: ${currentGameDisplayedCartelas}`;
            playSound('blockSound'); // Play the block sound when button is clicked
        };

        cardContainer.appendChild(blockButton); // Append the block button
        bingoCardsContainer.insertBefore(cardContainer, bingoCardsContainer.firstChild);
        
      // Bonus Button
                const bonusButton = document.createElement('button');
                bonusButton.textContent = 'Bonus'; 
                bonusButton.className = 'bonus-button'; 
bonusButton.onclick = () => {
    if (!bonusClaimed) {
        // Check the number of called numbers and L-shape
        if (calledNumbers.length < 50) {
            if (checkForLShape(cartelaCards[cartelaIndex])) {
                // Bonus can be claimed as conditions are met
                let bonusAmount = currentGameEarnings;

                // Update total winner amount and display it
                totalWinnerAmount += bonusAmount;
                winnerAmountDisplay.textContent = `Winner Amount: ${totalWinnerAmount} Birr`;
                alert
            showResponse("Congratulations! ዉድ ደንበኛችን ጨዋታውን በብቃት ስላጠናቀቁ ቦነስ እጥፍ ተጨምሮሎታል !");

                // Adjust daily and monthly earnings after claiming the bonus
                dailyEarnings -= bonusAmount;
                businessmanEarnings -= bonusAmount;
                dailyEarningsDisplay.textContent = `Today's Earnings: ${dailyEarnings} Birr`;
                businessmanEarningsDisplay.textContent = `Businessman's Total Earnings This Month: ${businessmanEarnings} Birr`;

                // Mark that the bonus has been claimed
                bonusClaimed = true;
            } else {
               showResponse("ቦነስ የለውም!");
            }
        } else {
            showResponse("ቦነስ የሚያገኙበትን መስፈርት ስላላሟሉ ቦነሱ ተሰርዟል!");
        }
    } else {
       showResponse(" ተከፍሏል! $ ቦነስ ከአንድ ጊዜ በላይ መክፈል አይችሉም!");
    }
};

 cardContainer.appendChild(bonusButton); // Append Bonus button to card
        bingoCardsContainer.insertBefore(cardContainer, bingoCardsContainer.firstChild);
    

                checkPasswordRequirement(); 
            
        

// Implementing L-check inside existing function
function checkForLShape(cartela) {
    const firstColumnNumbers = [cartela[0], cartela[5], cartela[10], cartela[15], cartela[20]];
    const lastRowNumbers = cartela.slice(20, 25);
    const markedNumbers = Array.from(document.getElementsByClassName('marked')).map(div => parseInt(div.textContent));

    const isLShape = firstColumnNumbers.every(num => markedNumbers.includes(num)) &&
                     lastRowNumbers.every(num => markedNumbers.includes(num));

    return isLShape;
}

        
            let winnerAmount;
                if (currentGameDisplayedCartelas <= 0) {
                    winnerAmount = selectedBetAmount * 0.9;
                } else {
                    winnerAmount = selectedBetAmount * 0.8;
                }
                winnerAmountDisplay.textContent = `Winner Amount: ${winnerAmount * currentGameDisplayedCartelas} Birr`;
     
                checkPasswordRequirement(); // Check if the password prompt is needed
            }
        


             
        function checkForNewDevice() {
            if (!localStorage.getItem('isNewDevice')) {
                localStorage.setItem('isNewDevice', 'true');
                askForPassword('Welcome! Please set a password for this device:');
            }
        }



        function checkForNewDevice() {
            if (!localStorage.getItem('isNewDevice')) {
                localStorage.setItem('isNewDevice', 'true');
                askForPassword('Welcome! Please set a password for this device:');
     
    
            }
        }

        function checkPasswordRequirement() {
            if (totalDisplayedCartelas >= cartelaLimit) {
                askForPassword('ውድ ደንበኛችን የተፈቀደሎትን ፓኬጅ ጨርሰዋል ');  
   window.location.href = 'https://example.com'; // Change this to your desired redirection URL  
   
  
              
                        
                           localStorage.setItem('totalDisplayedCartelas', totalDisplayedCartelas);
            }
        }

        function askForPassword(message) {
            const userPassword = prompt(message) || '';
            if (userPassword === password) {
                alert("Password accepted.");
            } else {
                alert('Incorrect password! Access denied.');
            }
        }


 // Order Cartela functionality
        orderButton.onclick = function() {
            const cartelaId = parseInt(orderCartelaInput.value, 10);
            if (displayedCartelas.has(cartelaId)) {
                // Move the ordered cartela to the top
                const cartelaElement = document.getElementById(`cartela-${cartelaId}`);
                if (cartelaElement) {
                    bingoCardsContainer.prepend(cartelaElement); // Move it to the top
                }
                showResponse(`Cartela ${cartelaId} has been Checked .`);
            } else {
                showResponse(`Cartela ${cartelaId} is not displayed.`);
            }
        };

        // Example: Add a card by ID (you can integrate this based on your existing logic)
        document.getElementById('check-winner-button').onclick = () => {
            const cartelaNumber = parseInt(document.getElementById('cartela-number').value);
            if (!displayedCartelas.has(cartelaNumber)) {
                displayBingoCard(cartelaNumber);
            } else {
                showResponse(`Cartela ${cartelaNumber} is already displayed.`);
            }
        };

        // Initialize other game functionalities ...





// Unlocking functionality
        unlockButton.onclick = function () {
            const userInputPassword = passwordInput.value;
            if (userInputPassword === 'Password') { // Change this to your correct password
                alert('Password accepted. You can now change the cartela limit.');
                limitSelect.disabled = false; // Enable the selection
                localStorage.setItem('isLimitUnlocked', true); // Save the unlock status
                passwordInput.value = ''; // Clear password input
            } else {
                alert('Incorrect password! Access denied.');
            }
        };

 // Setting the cartela limit
        setLimitButton.onclick = function () {
            if (!limitSelect.disabled) {
                cartelaLimit = limitSelect.value; // Get the selected value
                localStorage.setItem('cartelaLimit', cartelaLimit); // Store the selected limit
                alert(`Cartela limit has been set to ${cartelaLimit}.`);
            } else {
                alert('For Additional  Package Call 0910167348.');
            }
        };



  // On page load, re-enable the dropdown if it's unlocked previously
        window.onload = function () {
        
       checkForNewDevice();
            checkForNewMonth(); // Initialize the month check.
            const isLimitUnlocked = localStorage.getItem('isLimitUnlocked') === 'true';
            limitSelect.disabled = !isLimitUnlocked;
        };


        
    


        callNumberButton.onclick = () => {
            resetCurrentGameCartelasCount();
            bingoCardsContainer.style.display = 'block'; // Make sure to show the bingo cards when the game starts
            startAutoPlay();
        };




 checkWinnerButton.onclick = () => {
 
  // Check if the maximum number of calls has been reached
    if (calledNumbersCount >= 5) {
       showResponse('መመዝገብ አይችሉም!');
        return; // Exit the function if the condition is met
    }

   // Check if any bet amount is selected before adding a cartela
   if (selectedBetAmount <= 0) {
    showResponse('እባክዎ ካርቴላ ከመመዝገብዎ በፊት የብር መጠን ይምረጡ !');
       return;
   }


const cartelaNumber = parseInt(cartelaNumberInput.value);
    
    // Ensure cartela number is valid and check if it already exists
    if (cartelaCards[cartelaNumber]) {
        if (!displayedCartelas.has(cartelaNumber)) { // Check if the cartela is already displayed
            displayBingoCard(cartelaCards[cartelaNumber], false, cartelaNumber);
            displayedCartelas.add(cartelaNumber); // Add the cartela number to the Set
            document.getElementById("bet-amount").disabled = true; // Disable the bet amount selection after a cartela is added
        } else {
            showResponse('ተመዝግቧል'); // Notify the user it's already displayed
        }
    } else {
        showResponse('እባክዎ የካርቴላውን አይዲ ቁጥር ይፃፉ!'); // Notify if the cartela does not exist
    }
};

// Your displayBingoCard function definition goes here...


   const cartelaNumber = parseInt(cartelaNumberInput.value);
   if (cartelaCards[cartelaNumber]) {
       displayBingoCard(cartelaCards[cartelaNumber], false, cartelaNumber);
       document.getElementById("bet-amount").disabled = true;
    
                
       // Disable the bet amount selection after a cartela is added
        document.getElementById("bet-amount").disabled = true;
    
   
       }
 
 

        function startAutoPlay() {
            if (isAutoPlaying) {
                clearInterval(intervalId);
                isAutoPlaying = false;
                callNumberButton.textContent = 'Start Game';
                playSound('stopSound');
            } else {
                isAutoPlaying = true;
                intervalId = setInterval(callNumber, autoPlayInterval);
                callNumberButton.textContent = 'Stop Game';
                playSound('startSound');
            }
        }

window.onload = () => {
    checkForNewDevice();
    

    // Logic to reset daily earnings at 7 AM every day
    const lastEarningsResetDate = localStorage.getItem('lastEarningsResetDate');
    const today = new Date();
    const currentDay = today.toISOString().split('T')[0]; // Get today's date

    // Check if the last reset date exists
    if (lastEarningsResetDate) {
        const lastResetDate = new Date(lastEarningsResetDate); // Convert saved date string to Date object

        // Check if the last reset date is different from the current day
        if (lastResetDate.toISOString().split('T')[0] !== currentDay) {
            dailyEarnings = 0; // Reset daily earnings
            localStorage.setItem('dailyEarnings', dailyEarnings); // Store updated earnings
            document.getElementById('dailyEarnings').textContent = `Today's Earnings: ${dailyEarnings} Birr`;

            // Update the last earnings reset date to today
            localStorage.setItem('lastEarningsResetDate', currentDay);
        }
    } else {
        // If the last earnings reset date does not exist, set it to today
        localStorage.setItem('lastEarningsResetDate', currentDay);
    }

    // Get the current hour and check if it's past 7 AM
    if (today.getHours() >= 7 && lastEarningsResetDate === currentDay) {
        // If current time is after 7 AM and the last reset was already today, do nothing
    }
    else if (today.getHours() < 7 && lastEarningsResetDate !== currentDay) {
        // If it's before 7 AM and the date has changed, it means we are in a new day
        dailyEarnings = 0; // Reset daily earnings
        localStorage.setItem('dailyEarnings', dailyEarnings); // Store updated earnings
        document.getElementById('dailyEarnings').textContent = `Today's Earnings: ${dailyEarnings} Birr`;
        
        // Update the last earnings reset date to today
        localStorage.setItem('lastEarningsResetDate', currentDay);
    }
};


resetButton.onclick = () => {
    calledNumbers = [];
    isAutoPlaying = false;
    calledNumbersCount = 0; // Reset count on game reset
    clearInterval(intervalId);
    calledNumbersContainer.innerHTML = '';
    cartelaNumberInput.value = '';
    bingoCardsContainer.innerHTML = ''; // Clear for new game
    bingoCardsContainer.style.display = 'none'; // Hide bingo cards on reset
    callNumberButton.textContent = 'Start Game';
    displayedCartelas.clear(); // Clear the displayed cartelas set
  bonusClaimed = false; // Reset bonus flag for the next game
    totalWinnerAmount = 0; // Reset total winner amount
   nextNumberButton.disabled = true; // Disable next number button until the game starts
            clearInterval(intervalId); 
    
    currentGameEarnings = 0; // Reset current game earnings  
    markedNumberCount = 0; // Reset marked numbers counter
    winnerAmountDisplay.textContent = "Winner Amount: 0 Birr";   

    // Enable the bet amount selection when the game is reset
    document.getElementById("bet-amount").disabled = false;

    resetCurrentGameCartelasCount();
};
 


    
    
    
    