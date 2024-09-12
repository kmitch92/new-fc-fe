interface SpacedRepetitionResult {
  daysUntilNextReview: number;
  newEase: number;
}

export const spacedRepetition = (
  lastDate: Date,
  todayDate: Date,
  success: boolean,
  ease: number,
  numberOfReviews: number
): SpacedRepetitionResult => {
  const diff = todayDate.getTime() - lastDate.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.floor(diff / oneDay);

  if (success) {
    const multiplier = Math.random() * (1.3 - 1.0) + 1.0;
    const newDiff = diffDays * ease * multiplier;
    const newEase = updateEase(numberOfReviews, ease, success);
    return { daysUntilNextReview: newDiff, newEase };
  } else {
    const newDiff = diffDays * (1 / 4);
    const newEase = updateEase(numberOfReviews, ease, success);
    return { daysUntilNextReview: newDiff, newEase };
  }
};

export const updateEase = (
  numberOfReviews: number,
  ease: number,
  success: boolean
): number => {
  if (success) {
    const newEase = ease + (1 - ease) / numberOfReviews;
    return newEase;
  } else {
    const newEase = ease - ease / numberOfReviews;
    return newEase;
  }
};
