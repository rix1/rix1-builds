function calculatePizza() {
  // Inputs

  var numberDough = 20;

  var weightDough = 260;

  var hydration = 62;

  var saltvalue = 2.2;

  var proofTime = 11;

  var proofTemp = 16;

  // Calculate Flour & Water

  var hydrationDecimal = hydration / 100;

  var hydrationMultiplier = 1 + hydrationDecimal;

  var totalDough = numberDough * weightDough;

  var flourRequiredNoRound = totalDough / hydrationMultiplier;

  var flourRequired = Math.round(totalDough / hydrationMultiplier);

  var waterRequired = Math.round(flourRequired * hydrationDecimal);

  // Calculate Salt

  var saltDecimal = saltvalue / 100;

  var saltRequired = Math.round(saltDecimal * flourRequired);

  // Calculate Yeast

  var tempDifference = proofTemp - 13;

  var timeDifference = proofTime - 8;

  var amountFlourYeast =
    flourRequiredNoRound / (91 + Math.sqrt(flourRequiredNoRound));

  var yeastTempRequired = amountFlourYeast * Math.pow(0.81, tempDifference);

  // var yeastTimeRequired = yeastTempRequired * Math.pow(0.85, timeDifference);

  var yeastTimeRequired = yeastTempRequired * Math.pow(0.899, timeDifference);

  // var yeastRound = Math.round((yeastTimeRequired + Number.EPSILON) * 100) / 100;

  // Allow for Yeast Types

  let yeastType = "activeYeast"; // freshYeast | none
  let yeastAmount = 0;

  if (yeastType == "activeYeast") {
    yeastAmount = yeastTimeRequired * 1.25;
  } else if (yeastType == "freshYeast") {
    yeastAmount = yeastTimeRequired * 3;
  } else {
    yeastAmount = yeastTimeRequired;
  }

  // Round the Yeast

  var yeastTypeRound = Math.round((yeastType + Number.EPSILON) * 100) / 100;

  // Output
  console.log(`water: ${waterRequired}
flour: ${flourRequired}
salt: ${saltRequired}
yeast: ${yeastTypeRound}`);
}
