;; Proof-of-Action (PoA) v1.0.0
;; A simple on-chain registry where users can record actions (as 32-byte hashes) and later prove they took them.
;; Includes: owner, optional fee in microSTX, per-user counters, read-only helpers, and an emitted event.

(define-data-var contract-owner principal tx-sender)
(define-data-var action-fee uint u0) ;; optional fee in microSTX (e.g., set to u1000 for 0.001 STX)

(define-map actions
  ((user principal) (id uint))
  (
    (hash (buff 32))
    (timestamp uint)
  )
)

(define-map action-count
  ((user principal))
  ((count uint))
)

(define-event action-recorded
  (tuple (user principal) (id uint) (hash (buff 32)) (timestamp uint))
)

(define-read-only (get-owner)
  (ok (var-get contract-owner))
)

(define-public (set-fee (new-fee uint))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err u100)) ;; not-owner
    (var-set action-fee new-fee)
    (ok new-fee)
  )
)

(define-read-only (get-fee)
  (ok (var-get action-fee))
)

(define-read-only (get-count (user principal))
  (default-to u0 (get count (map-get? action-count { user: user })))
)

(define-read-only (get-action (user principal) (id uint))
  (match (map-get? actions { user: user, id: id })
    action (ok action)
    (err u404) ;; not-found
  )
)

(define-public (record-action (hash (buff 32)))
  (begin
    ;; charge optional fee (if > 0)
    (let ((fee (var-get action-fee)))
      (if (> fee u0)
        (begin
          (try! (stx-transfer? fee tx-sender (var-get contract-owner)))
          (ok true)
        )
        (ok true)
      )
    )
    ;; compute next id and persist
    (let (
      (current (default-to u0 (get count (map-get? action-count { user: tx-sender }))))
      (next-id (+ current u1))
      (now (block-height))
    )
      (map-set actions { user: tx-sender, id: next-id }
        { hash: hash, timestamp: now }
      )
      (map-set action-count { user: tx-sender } { count: next-id })
      (emit-event (action-recorded { user: tx-sender, id: next-id, hash: hash, timestamp: now }))
      (ok next-id)
    )
  )
)
